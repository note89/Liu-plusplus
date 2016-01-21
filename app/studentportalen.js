/* set up FireBASE */
/**********************************************
***********************************************
************** IF YOU ARE TESTING *************
********** set up your own firebase ***********
*********************  OR *********************
*********** uncomment the line below **********
***********************************************
**********************************************/
var myFirebaseRef = new Firebase("https://studentportalen-data.firebaseio.com/");
// var myFirebaseRef = new Firebase("https://test-liu.firebaseio.com/");

var getAllCourseData = function () {
    var fireCourses = myFirebaseRef.child("courses");
    fireCourses.on("value", function (snapshot) {
        var courses = snapshot.val();
        $('.course-row').each(function (i, row) {
            var rowID = $(row).attr('id').replace('*', '');
            if (rowID in courses) {
                if (courses[rowID].level)


                    var level = typeof courses[rowID].level !== 'undefined' ? courses[rowID].level : 'empty'
                var lastEditDate;
                var lastEditAutor;
                if (typeof courses[rowID].lastEdit !== 'undefined') {
                    lastEditDate = typeof courses[rowID].lastEdit.date !== 'undefined' ? courses[rowID].lastEdit.date : ''
                    lastEditAuthor = typeof courses[rowID].lastEdit.author !== 'undefined' ? courses[rowID].lastEdit.author : ''
                }

                var select = $(row).find('select');
                selectAlternative(level, select);
                // $(row).find('.'+level).attr('selected',true);
                var tooltipLastUpdate = 'Senast updateringen\n';
                tooltipLastUpdate += lastEditAuthor + '\n';
                tooltipLastUpdate += timeStampToString(lastEditDate);
                $(row).find('.course-levels').attr('title', tooltipLastUpdate).tooltip('fixTitle');


            }
        });


    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}();


var timeStampToString = function (timestamp) {
    var date = new Date(timestamp);

    var year = date.getFullYear();
    var month = date.getMonth();
    var dayOfMonth = date.getDate();

    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
    var formattedTime = year + '/' + month + '/' + dayOfMonth +' ';
    formattedTime += hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
}

var updateCourseLevel = function (course, level, author) {
    var fireCourses = myFirebaseRef.child("courses");

    fireCourses.child(course).set({
        "level": level,
        "lastEdit": {
            "author": author,
            "date": Firebase.ServerValue.TIMESTAMP
        }
    });
}

/* END OF FIREBASE */


$("head").prepend('<meta charset="utf-8">');



var studiehandbokenBase = "http://kdb-5.liu.se/liu/lith/studiehandboken/svkursplan.lasso?&k_budget_year=2015&k_kurskod="


//// VIEW ////
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});


/*
 Give the table of courses a id
 */
$("table.resultlist > tbody").attr('id', 'grade-table');
$("table.resultlist").addClass('table');
$("table.resultlist").addClass('table-condensed');

//var createLevelBox = function(selectedLevel){


var levelBox = '\
<td>\
<select class="course-levels" data-toggle="tooltip"  data-placement="left" \
+>\
<option class="G1" value="G1">G1</option>\
<option class="G2" value="G2">G2</option>\
<option class="B" value="B">B</option>\
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

var tooltipLevel = 'Ändringar synkas mellan alla användare.\n';
tooltipLevel += 'Hjälp till och hålla dem aktuella\n';

var tooltipGrade = 'Här kan du ändra dina betyg \n';
tooltipGrade += 'för och se hur värt det är och plussa';



(function expandTableOfCourses() {
    $("#grade-table").children().each(function () {

        var row = rowType(this);
        if (row.numericGrade || row.letterGrade) {

            if (row.courseComponent) {
                $(this).prepend("<td></td>");
                $(this).addClass('non-course-row');
                $(this).append('<td></td>');

            }
            else {
                if(row.zeroHp){
                    $(this).prepend("<td></td>");
                }
                if(!row.zeroHp){
                    $(this).prepend("<td><input type='checkbox' class='course-checkbox'></td>");
                }
                $(this).children().eq(1).wrapInner("<a target='_blank' href='" + studiehandbokenBase + $(this).children().eq(1).text() + "'></a>");


                $(this).addClass('course-row');
                if ($(this).children().eq(1).text().indexOf("*") > 0) {
                    $(this).addClass("is-finished");
                } else {
                    $(this).addClass("is-not-finished");
                }
                $(this).attr('id', $(this).children().eq(1).text());
                $(this).append(levelBox);

            }


            $(this).children().eq(4).attr('nowrap', 'nowrap');
            $(this).children().eq(4).wrapInner("<span class='grade'></span>");
            if (row.courseComponent || row.letterGrade || row.zeroHp) {
                $(this).children().eq(4).append(" <span class='input-holder'></span>");

            }
            else {
                $(this).children().eq(4).append(" <input type='button' value='+' class='plus' /><input type='button' value='-' class='minus' />");
            }


            $(this).children().eq(1).addClass("course-code");
            $(this).children().eq(2).addClass("course-name");
            $(this).children().eq(3).addClass("hp"); // TODO:refactor
            $(this).children().eq(4).addClass("course-grade");
            $(this).children().eq(5).addClass("course-date");
            $(this).children().eq(6).addClass("course-level");

            //is course finished ?

            //


        }
        if ($(this).children().eq(0).text() == "Kurskod") {
            $(this).prepend("<th>Vald</th>");
            //HP padding
            if ($(this).children().eq(4).text() != "Betyg") {
                $(this).append('<th>Betyg</th>');
                //$('#grade-header').attr('data-toggle','tooltip');
                //$('#grade-header').attr('title',tooltipGrade);
                $(this).append('<th></th>');
            }
           //SET GRADE TOOL TIP

            $(this).children().eq(4).append('<span class="custom-icon smaller-icon grade-header">i</span></div>');
            $('.grade-header').attr('data-toggle','tooltip');
            $('.grade-header').attr('title',tooltipGrade);
            $('.grade-header').attr('data-placement','top');

            $(this).append('<th data-toggle="tooltip" title="' + tooltipLevel + '" class="th-level"><div' +
                ' style="white-space:' +
                ' nowrap;">Nivå' +
                '<span class="custom-icon smaller-icon">i</span></div></th>');
        }
    });
})();

function rowType(row) {
    var header = $(row).children().eq(0).is("th");
    var numberOfEntrys = $(row).children().size();
    var hasNumbericGrade = !isNaN(Number($(row).children().eq(3).text()));
    var hasBoldText = $(row).children().eq(0).find("b").length != 0;
    var zeroHp = $(row).children().eq(2).text() === "0.0"

    var courseRow = false
    var numericGrade = false;
    var letterGrade = false;
    var notACourse = false;
    var courseComponent = false;

    if (!hasBoldText) {
        courseComponent = true;
    }

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
        courseRow: courseRow,
        numericGrade: numericGrade,
        letterGrade: letterGrade,
        courseComponent: courseComponent,
        notACourse: notACourse,
        zeroHp:zeroHp
    }
}


/*
    Function for all courses of a certain type on or of.
 */

function toggleBoxesBasedOnClass(className) {
    if (this.checked) {
        $('.course-checkbox').each(function () {
            var row = $(this).closest("tr");
            if (row.hasClass(className)) {
                this.checked = true;
                row.addClass('selected');
            }

        });
    }
    else {
        $('.course-checkbox').each(function () {
            var row = $(this).closest("tr");
            if (row.hasClass(className)) {
                this.checked = false;
                row.removeClass('selected');
            }
        });
    }
}

/*
 when we click 'select-all-todo' all todo courses
 should be selected,
 */

$("#select-all-todo").click(function (event) {
    event.stopPropagation();
    toggleBoxesBasedOnClass.call(this, 'is-not-finished');
});


/*
 when we click 'select-all-done' all done courses
 should be selected,
 */

$("#select-all-done").click(function (event) {
    event.stopPropagation();
    toggleBoxesBasedOnClass.call(this, 'is-finished');
});







/*
 pression a row should make it checked and highlighted
 */


$('#grade-table').delegate('tr', 'click', function (e) {
    if ($(e.target).is('input:checkbox')) {
        this.checked = !this.checked;
        $(this).toggleClass('selected');
        //Pressing the studiehandboken link should not check the box.
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

    var prettyPrintLevel = function (level) {
        return level.done + " + (" + level.todo + ") " + " = " + level.total
    }
    var prettyPrintLevelOthers = function (levelPoints) {
        var done = levelPoints.G1.done + levelPoints.G2.done + levelPoints.B.done + levelPoints.empty.done;
        var todo = levelPoints.G1.todo + levelPoints.G2.todo + levelPoints.B.todo + levelPoints.empty.todo;
        var total = levelPoints.G1.total + levelPoints.G2.total + levelPoints.B.total + levelPoints.empty.total;
        return done + " + (" + todo + ") " + " = " + total
    }
    $('#modal-text').text(fillModal());
    $('#sum-advanced-points').text(prettyPrintLevel(levelPoints.A));
    $('#sum-other-points').text(prettyPrintLevelOthers(levelPoints));
    $('#sum-abroad-n-test-points').text(levelPoints.credits.total);
    $('#sum-total-points').text(levelPoints.sum.total);
    $('#average-grade').text(grades.average.toFixed(2));
    $('#weighted-average-grade').text(grades.WeightedAverage.toFixed(2));
});

/*
 Add hover highlighting for course-rows

 */


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
        selectRow(gradeElement.closest('tr'));
        if (!isNaN(grade)) {
            // Increment

            $(gradeElement).text(boundValue(grade + 1));
        }
    });

    $('.minus').click(function (e) {
        e.stopPropagation();
        var gradeElement = $(this).prevAll(".grade");
        var grade = Number(gradeElement.text());
        // If is not undefined


        if (!isNaN(grade)) {
            // Increment
            if ((grade - 1) <= 2) {
                $(gradeElement).text('');
                deselectRow(gradeElement.closest('tr'));
            } else {
                $(gradeElement).text(boundValue(grade - 1));
            }

        }
    });

    var boundValue = function (value) {
        if (value > 5)return 5;
        if (value < 3)return 3;
        return value;
    }

})();

function deselectRow(row) {

    if ($(row).hasClass('selected')) {
        $(row).find('.course-checkbox').attr('checked', false);
        $(row).removeClass('selected');
    }
}
function selectRow(row) {
    if (!$(row).hasClass('selected')) {
        $(row).find('.course-checkbox').click();
        //$(row).addClass('selected');
    }
}

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
        var date = new Date();
        var author = getAuthor();

        updateCourseLevel(courseID, level, author);
        $(select).tooltip('fixTitle').tooltip('show');

    });

})();

function getAuthor(){
    var stringThatContainsName = $('body > table:nth-child(4) > tbody > tr:nth-child(1) > td:nth-child(1) > a >' +
        ' b:nth-child(1)').text();
    var indexOfAtsign = stringThatContainsName.indexOf('@');
    var name = stringThatContainsName.substr(0,indexOfAtsign);

    return name
}

var isCourseDone = function (courseRow) {
    if ($(courseRow).hasClass("is-finished")) {
        return true;
    }
    else {
        return false;
    }
}


var sumPointsInLevels = function () {

    var selectedRows = $(".course-checkbox:checked").parent().parent();

    function findDataOnLevel(level) {
        var pointObj = {
            done: 0,
            todo: 0,
            total: 0
        };
        var selectedRows = $(".course-checkbox:checked").parent().parent();
        selectedRows.each(function (i, obj) {
            if ($(obj).find('.course-levels').val() === level) {
                if (isCourseDone(obj)) {
                    pointObj.done += Number($(obj).find('.hp').text());
                }
                else {
                    pointObj.todo += Number($(obj).find('.hp').text());
                }
                pointObj.total += Number($(obj).find('.hp').text());
            }

        });

        return pointObj;
    }

    function findCredits() {
        var findCreditsCourse = function () {
            var credits = $(".tillgodolist ~ table tr").eq(4).children().eq(1).text();
            return Number(credits);

        }
        var findCreditsTests = function () {
            var credits = $(".tillgodolist ~ table tr").eq(5).children().eq(1).text();
            return Number(credits);
        }

        var abroad = findCreditsCourse();
        var tests = findCreditsTests();
        var done = abroad + tests;

        return {
            abroad: abroad,
            tests: tests,
            done: done,
            todo: 0,
            total: done
        }
    }

    function sumPoints(arrayOfLevels) {
        var done = 0;
        var todo = 0;
        var total = 0;
        _(arrayOfLevels).forEach(function (n) {
            done += n.done;
            todo += n.todo;
            total += n.total;
        }).value();

        return {
            done: done,
            todo: todo,
            total: total
        }
    }

    var levelA = findDataOnLevel("A");
    var levelB = findDataOnLevel("B");
    var levelG1 = findDataOnLevel("G1");
    var levelG2 = findDataOnLevel("G2");
    var empty = findDataOnLevel("empty");
    var credits = findCredits();
    var sum = sumPoints([levelA,levelB, levelG1, levelG2, empty, credits]);

    return {
        G1: levelG1,
        G2: levelG2,
        B: levelB,
        A: levelA,
        credits: credits,
        empty: empty,
        sum: sum
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
