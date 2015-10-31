/* set up FireBASE */
var myFirebaseRef = new Firebase("https://studentportalen-data.firebaseio.com/");

var getAllCourseData = function () {
    var fireCourses = myFirebaseRef.child("courses");
    fireCourses.on("value", function (snapshot) {
        var courses = snapshot.val();
        $('.course-row').each(function (i, row) {
            var rowID = $(row).attr('id').replace('*', '');
            if (rowID in courses) {
                var level = courses[rowID].level
                var select = $(row).find('select');
                selectAlternative(level, select);
                // $(row).find('.'+level).attr('selected',true);

            }
        });


    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}();


var updateCourseLevel = function (course, level) {
    var fireCourses = myFirebaseRef.child("courses");
    fireCourses.child(course).set({"level": level});
}

/* END OF FIREBASE */


$("head").prepend('<meta charset="utf-8">');

//console.debug('start: add CSS');
//var bootcss = GM_getResourceText('bootcss');
//GM_addStyle(bootcss);
//console.debug('done: add CSS');


var studiehandbokenBase = "http://kdb-5.liu.se/liu/lith/studiehandboken/svkursplan.lasso?&k_budget_year=2015&k_kurskod="


//// VIEW ////
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});


/*
 Give the table of courses a id
 */
$("table.resultlist > tbody").attr('id', 'grade-table');


//var createLevelBox = function(selectedLevel){


var levelBox = '\
<td>\
<select class="course-levels">\
<option class="G1" value="G1">G1</option>\
<option class="G2" value="G2">G2</option>\
<option class="A" value="A">A</option>\
<option class="empty" value="empty" selected></option>\
</select>\
</td>';


/**
 MODIFY THE TABLE OF GRADES
 -Add new header "Selected"
 -Add checkbox for all courses
 -Add plus minus sign next to grades to se the impact
 of rasing them
 **/

var toolTipTemplate = 'Detta fält är en WIKI.\n';
toolTipTemplate += 'Ändringar syncas mellan alla användare.\n';
toolTipTemplate += 'Hjälp till och hålla dem aktuella\n';

(function expandTableOfGrades() {
    $("#grade-table").children().each(function () {

        var row = rowType(this);
        if (row.numericGrade || row.letterGrade) {

            $(this).prepend("<td><input type='checkbox' class='course-checkbox'></td>");

            $(this).children().eq(4).attr('nowrap', 'nowrap');
            $(this).children().eq(4).wrapInner("<span class='grade'></span>");
            $(this).children().eq(4).append(" <input type='button' value='+' class='plus' /><input type='button' value='-' class='minus' />");

            $(this).children().eq(3).addClass("hp");
            $(this).children().eq(1).addClass("course-code");
            //is course finished ?
            if ($(this).children().eq(1).text().indexOf("*") > 0) {
                $(this).children().eq(1).addClass("is-finished");
            }
            //

            $(this).children().eq(1).wrapInner("<a href='" + studiehandbokenBase + $(this).children().eq(1).text() + "'></a>");
            $(this).addClass('course-row');
            $(this).attr('id', $(this).children().eq(1).text());
            $(this).append(levelBox);
        }
        if ($(this).children().eq(0).text() == "Kurskod") {
            $(this).prepend("<th>Vald</th>");
            //HP padding
            if ($(this).children().eq(4).text() != "Betyg") {
                $(this).append('<th>Betyg</th>');
                $(this).append('<th></th>');
            }


            $(this).children().eq(3).attr('style', 'padding-right:23px');
            $(this).append('<th data-toggle="tooltip" title="' + toolTipTemplate + '" class="th-level">Nivå' +
                '<span class="text-muted">?</span></th>');
        }
    });
})();

function rowType(row) {
    var header = $(row).children().eq(0).is("th");
    var numberOfEntrys = $(row).children().size();
    var hasNumbericGrade = !isNaN(Number($(row).children().eq(3).text()));

    var numericGrade = false;
    var letterGrade = false;
    var notAcourse = false;

    if (!header && numberOfEntrys > 2 && hasNumbericGrade) {
        numericGrade = true;
    }
    else if (!header && numberOfEntrys > 2 && !hasNumbericGrade) {
        letterGrade = true;
    }
    else {
        notACourse = true;
    }

    return {
        numericGrade: numericGrade,
        letterGrade: letterGrade,
        notACourse: notACourse
    }
}

/*
 when we click 'select-all-done' all done courses
 should be selected,
 */

$("#select-all-done").click(function (event) {
    event.stopPropagation();

    if (this.checked) {
        $('.course-checkbox').each(function () {

            var row = $(this).closest("tr");
            if (row.find('.is-finished').length != 0) {
                this.checked = true;
                row.addClass('selected');
            }

        });
    }
    else {
        $('.course-checkbox').each(function () {
            this.checked = false;
            $(this).closest("tr").removeClass('selected');
        });
    }

});


/*
 pression a row should make it checked and highlighted
 */


$('#grade-table').delegate('tr', 'click', function (e) {
    if ($(e.target).is('input:checkbox')) {
        this.checked = !this.checked;
        $(this).toggleClass('selected');
    } else if ($(e.target).parent().is("a")) {
        e.stopPropagation();
    }
    else {
        $(this).find("input[type='checkbox']").click();

    }
});


/**
 When we click the button "Calculate"
 we first call calculateAverages();
 then put the numbers in the view for the user to se
 **/
$("#calculate-btn").click(function (event) {
    var levelPoints = sumPointsInLevels();
    var grades = calculateAverages();
    $('#sum-advanced-points').text(levelPoints.A);
    $('#sum-other-points').text(levelPoints.G1 + levelPoints.G2 + levelPoints.empty);
    $('#sum-abroad-n-test-points').text(findCreditsCourse() + findCreditsTests());
    $('#sum-total-points').text(levelPoints.A + levelPoints.G1 + levelPoints.G2 + levelPoints.empty + findCreditsCourse() + findCreditsTests());
    $('#average-grade').text(grades.average.toFixed(2));
    $('#weighted-average-grade').text(grades.WeightedAverage.toFixed(2));
});

/*
 Add hover highlighting for course-rows

 */
document.styleSheets[0].insertRule('.course-row:hover { background-color: #FF9; outline: thin solid black;}', 0);
document.styleSheets[0].insertRule('.selected { background-color: #FFC; outline: thin solid black;}', 0);


/// Controllers /////


/*
 This function calculated the average and weighted average
 of selected fields.
 */

function calculateAverages() {

    var selectedRows = $(".course-checkbox:checked").parent().parent();


    var avrage = (function () {
        var gradesWithoutNumbers = 0;
        var sum = 0;
        selectedRows.each(function () {
            var grade = Number($(this).children().eq(4).text());
            if (!isNaN(grade)) {
                sum += grade;
            } else {
                gradesWithoutNumbers++;
            }
        });

        var coursesWithRegularGrades = selectedRows.size() - gradesWithoutNumbers;
        var avrage = sum / coursesWithRegularGrades;

        return avrage;
    })();

    var WeightedAverage = (function () {
        var pointsSum = 0;
        var pointsTimesGradeSum = 0;
        selectedRows.each(function () {
            var grade = Number($(this).children().eq(4).text());
            var points = Number($(this).children().eq(3).text());
            if (!isNaN(grade)) {
                pointsSum += points;
                pointsTimesGradeSum += points * grade;
            }
        });
        return pointsTimesGradeSum / pointsSum;
    })();


    return {
        WeightedAverage: WeightedAverage,
        average: avrage
    }
}


(function plusMinus() {

    $('.plus').click(function (e) {
        e.stopPropagation();
        var gradeElement = $(this).prev(".grade");
        var grade = Number(gradeElement.text());
        // If is not undefined
        if (!isNaN(grade)) {
            // Increment
            $(gradeElement).text(boundValue(grade + 1));
        } else {
            // Otherwise put a 0 there
            $(gradeElement).text(0);
        }
    });

    $('.minus').click(function (e) {
        e.stopPropagation();
        var gradeElement = $(this).prevAll(".grade");
        var grade = Number(gradeElement.text());
        // If is not undefined
        if (!isNaN(grade)) {
            // Increment
            $(gradeElement).text(boundValue(grade - 1));
        } else {
            // Otherwise put a 0 there
            $(gradeElement).text(0);
        }
    });

    var boundValue = function (value) {
        if (value > 5)return 5;
        if (value < 3)return 3;
        return value;
    }

})();

(function selectLevel() {
    $('select').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
    });
})();

(function onCourseSelected() {
    $('select').on('change', function (e) {
        var level = $(this).val();
        var select = $(this).closest('select');

        selectAlternative(level, select);

        var courseID = $(this).closest('tr').attr('id').replace('*', '');
        updateCourseLevel(courseID, level);
    });

})();

var isCourseDone = function(courseRow){
    if ($(courseRow).find(".is-finished")){
        return true;
    }
    else{
        return false;
    }
}


var sumPointsInLevels = function () {

    var selectedRows = $(".course-checkbox:checked").parent().parent();

    function findDataOnLevel(level) {
        var pointObj ={
            done: 0,
            todo: 0,
            total: 0
        };
        var selectedRows = $(".course-checkbox:checked").parent().parent();
        selectedRows.each(function (i, obj) {
            if ($(obj).find('.course-levels').val() === level) {
                if(isCourseDone(obj)){
                    pointObj.done +=Number($(obj).find('.hp').text());
                }
                else{
                    pointObj.todo +=Number($(obj).find('.hp').text());
                }
                pointObj.total +=Number($(obj).find('.hp').text());
            }

        });

        return pointObj.total;
    }

    var levelA = findDataOnLevel("A");
    var levelG1 = findDataOnLevel("G1");
    var levelG2 = findDataOnLevel("G2");
    var empty = findDataOnLevel("empty");
    return {
        G1: levelG1,
        G2: levelG2,
        A: levelA,
        empty: empty
    }
};

var findCreditsCourse = function () {
    var credits = $(".tillgodolist ~ table tr").eq(4).children().eq(1).text();
    return Number(credits);

}
var findCreditsTests = function () {
    var credits = $(".tillgodolist ~ table tr").eq(5).children().eq(1).text();
    return Number(credits);
}


//Helper Functions

var selectAlternative = function (alt, select) {
    select.children().removeAttr('selected');
    select.find('.' + alt).attr('selected', true);
}

