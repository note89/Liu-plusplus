// ==UserScript==
// @name         studentportalen-extended
// @namespace    http://ventureinto.space
// @version      0.2
// @description  Add missing functionality to studenportalen.liu.se
// @author       Nils Eriksson niler851@student.liu.se
// @match        https://www3.student.liu.se/portal/studieresultat/resultat*
// @grant        none
// @require      http://code.jquery.com/jquery-2.1.4.min.js
// ==/UserScript==


//// VIEW ////
/*
  Create area for grade info
*/
$("form").append("<div id='snitt' ><h1>Snitt</h1></div>");
$("#snitt").append("<h3 style='margin:0;'>Viktat: <span id='weighted-average-grade'></span></h3>");
$("#snitt").append("<h3 style='margin:1px;'>Oviktat: <span id='average-grade'></span></h3>");
$("#snitt").append("<p>Select all <input id='select-all' type='checkbox'></p>");
$("#snitt").append("<p><button id='calculate-btn' type='button'>Calculate</button></p>");


/*
 Give the table of courses a id
*/
$("table.resultlist > tbody").attr('id','grade-table');




/**
 MODIFY THE TABLE OF GRADES
 -Add new header "Selected"
 -Add checkbox for all courses
 -Add plus minus sign next to grades to se the impact
 of rasing them
 **/
(function expandTableOfGrades(){
    $("#grade-table").children().each(function(){
        if($(this).children().eq(0).text() !== "Kurskod" && $(this).children().size() >2 ){
            $(this).prepend("<td><input type='checkbox' class='course-checkbox'></td>");
            $(this).children().eq(4).attr('nowrap','nowrap');
            $(this).children().eq(4).wrapInner("<span class='grade' style='padding-right: 6px;'></span>");
            $(this).children().eq(4).append(" <input type='button' value='+' class='plus'/><input type='button' value='-' class='minus' />");
            $(this).addClass('course-row');
        }
        if($(this).children().eq(0).text() == "Kurskod"){
            $(this).prepend("<th>Select</th>");
            $(this).children().eq(3).attr('style','padding-right:23px');
        }
    });
})();

/*
 when we click select all,
 all checkboxes shoul be selected.
*/
$("#select-all").click(function(event){
    if(this.checked){
        $('.course-checkbox').each(function(){
            this.checked = true;
        });
    }
    else{
        $('.course-checkbox').each(function(){
            this.checked = false;
        });
    }

});


/**
 When we click the button "Calculate"
 we first call calculateAverages();
 then put the numbers in the view for the user to se
**/
$("#calculate-btn").click(function(event){
    var grades = calculateAverages();
    $('#average-grade').text(grades.average.toFixed(2));
    $('#weighted-average-grade').text(grades.WeightedAverage.toFixed(2));
});

/*
 Add hover highlighting for course-rows
*/
document.styleSheets[0].insertRule('.course-row:hover { background-color: #FF9; outline: thin solid black;}', 0);





/// Controllers /////



/*
 This function calculated the average and weighted average
 of selected fields.
*/

function calculateAverages(){

    var selectedRows = $(".course-checkbox:checked").parent().parent();


    var avrage = (function(){
        var gradesWithoutNumbers = 0;
        var sum = 0;
        selectedRows.each(function(){
            var grade = Number($(this).children().eq(4).text());
            if( !isNaN(grade)){
                sum += grade;
            }else{
                gradesWithoutNumbers++;
            }
        });

        var coursesWithRegularGrades = selectedRows.size() - gradesWithoutNumbers;
        var avrage = sum/coursesWithRegularGrades;

        return avrage;
    })();

    var WeightedAverage = (function(){
        var pointsSum = 0;
        var pointsTimesGradeSum =0;
        selectedRows.each(function(){
            var grade = Number($(this).children().eq(4).text());
            var points = Number($(this).children().eq(3).text());
            if( !isNaN(grade)){
                pointsSum += points;
                pointsTimesGradeSum += points*grade;
            }
        });
        return pointsTimesGradeSum/pointsSum;
    })();


    return {
        WeightedAverage: WeightedAverage,
        average: avrage
    }
}


(function plusMinus(){

    $('.plus').click(function(e){
        var gradeElement =$(this).prev(".grade");
        var grade = Number(gradeElement.text());
        // If is not undefined
        if (!isNaN(grade)) {
            // Increment
            $(gradeElement).text(boundValue(grade+1));
        } else {
            // Otherwise put a 0 there
            $(gradeElement).text(0);
        }
    });

    $('.minus').click(function(e){
        var gradeElement = $(this).prevAll(".grade");
        var grade = Number(gradeElement.text());
        // If is not undefined
        if (!isNaN(grade)) {
            // Increment
            $(gradeElement).text(boundValue(grade-1));
        } else {
            // Otherwise put a 0 there
            $(gradeElement).text(0);
        }
    });

    var boundValue = function(value){
        if(value > 5)return 5;
        if(value < 3)return 3;
        return value;
    }

    })();




