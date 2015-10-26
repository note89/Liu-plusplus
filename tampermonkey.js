// ==UserScript==
// @name         studentportalen++
// @namespace    http://ventureinto.space
// @version      0.1
// @description  Add missing functionality to studenportalen.liu.se
// @author       Nils Eriksson niler851@student.liu.se
// @match        https://www3.student.liu.se/portal/studieresultat/resultat?show_oavslut=oavslut&show_prov=prov&show_splitt=splitt&post_button_select_filter=Submit
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==


$("form").append("<div id='snitt' ><h1>Snitt</h1></div>");

$("#snitt").append("<h3 style='margin:0;'>Viktat: <span id='weighted-average-grade'></span></h3>");
$("#snitt").append("<h3 style='margin:1px;'>Oviktat: <span id='average-grade'></span></h3>");
$("#snitt").append("<p>Select all <input id='select-all' type='checkbox'></p>");
$("#snitt").append("<p><button id='calculate-btn' type='button'>Calculate</button></p>");




function calculateAvg(){
    
    var selectedRows = $(".course-checkbox:checked").parent().parent();
    var gradesWithOnlyG = 0;
    
    var sumGrades = (function(){
        var sum = 0;
        selectedRows.each(function(){
            var grade = Number($(this).children().eq(4).text());
            if( !isNaN(grade)){
                    sum += grade;
            }else{
            gradesWithOnlyG++;
            }
        });
        return sum;
     })();

    var coursesWithRegularGrades = selectedRows.size() - gradesWithOnlyG;
    var avrage = sumGrades/coursesWithRegularGrades;
    
    
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

$("table.resultlist > tbody").attr('id','grade-table');


(function expandTableOfGrades(){
    $("#grade-table").children().each(function(){
        if($(this).children().eq(0).text() !== "Kurskod" && $(this).children().size() >2 ){
           $(this).prepend("<td><input type='checkbox' class='course-checkbox'></td>");
        }
        if($(this).children().eq(0).text() == "Kurskod"){
        $(this).prepend("<th>Select</th>");
        }
    });
})();

///Select all button
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


//on calculate click
$("#calculate-btn").click(function(event){
  var grades = calculateAvg();
  $('#average-grade').text(grades.average.toFixed(2));
  $('#weighted-average-grade').text(grades.WeightedAverage.toFixed(2));
});


