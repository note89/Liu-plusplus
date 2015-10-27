// ==UserScript==
// @name         studentportalen-extended
// @namespace    http://ventureinto.space
// @version      0.1
// @description  Add missing functionality to studenportalen.liu.se
// @author       Nils Eriksson niler851@student.liu.se
// @match        https://www3.student.liu.se/portal/studieresultat/resultat?show_oavslut=oavslut&show_prov=prov&show_splitt=splitt&post_button_select_filter=Submit
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


// Add checkboxes and a new header to the table of grades.
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
  
        var coursesWithRegularGrades = selectedRows.size() - gradesWithOnlyG;
        var avrage = sumGrades/coursesWithRegularGrades;
        
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


