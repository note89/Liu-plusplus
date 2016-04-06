/*
Bootstrapify
 */
$("td[width='*']").wrapInner("<div class='container pull-left' id='studyresults-main-container'></div>");   //Main rights sidepanel wrapper
$("#studyresults-main-container > h1 , #studyresults-main-container > h1~form")
    .wrapAll("<div class='container pull-left' id='study-results-selector-div'><div class='col-xs-12'></div></div>"); // Studyresults


$("[name='post_button_select_filter']").addClass("btn btn-primary").css("margin-top","10px");

var fa = document.createElement('style');
fa.type = 'text/css';
fa.textContent = '@font-face { font-family: FontAwesome; src: url("'
    + chrome.extension.getURL('bower_components/font-awesome/fonts/fontawesome-webfont.woff')
    + '"); }';
document.head.appendChild(fa);


/*
 Create area for grade info
 */




/* AVERAGE */
$("#study-results-selector-div").after("<div id='info-container' class='container pull-left'></div>");
$("#info-container").append("<div id='snitt'" +
    " class='col-xs-3'><h1>Snitt<span id='average-info' class='custom-icon'>i</span></h1></div>");
$("#snitt").append("<h3>Viktat: <span id='weighted-average-grade' class='number-value'></span></h3>");
$("#snitt").append("<h3 style='margin-top:5px;'>Oviktat: <span id='average-grade' class='number-value'></span></h3>");
$("#snitt").append("<p>Markera avslutade <input id='select-all-done' type='checkbox'></p>");
$("#snitt").append("<p>Markera oavslutade <input id='select-all-todo' type='checkbox'></p>");
$("#snitt").append("<p><button id='calculate-btn' type='button' class='btn btn-success'>Beräkna</button></p>");

/*ToolTips for calculate-btn*/
var tooltipAverage = 'Viktat snitt\n';
tooltipAverage += 'betyder att en 5a\n';
tooltipAverage += 'i en 15 hp kurs är mer värd än en 5a i en 4 hp kurs\n';
$('#average-info').attr('data-toggle','tooltip');
$('#average-info').attr('title',tooltipAverage);
$('#average-info').attr('data-placement','right');





/*ToolTips for calculate-btn*/
var tooltipCalculate = 'Du måste välja vilka kurser.\n';
tooltipCalculate += 'som skall vara med i beräkningen\n';
$('#calculate-btn').attr('data-toggle','tooltip');
$('#calculate-btn').attr('title',tooltipCalculate);
$('#calculate-btn').attr('data-placement','right');



/* STATISTICS */
$("#info-container").append("<div id='statistics-div' class='col-xs-4'></div>");
$("#statistics-div").append('<h1>Statistik<span id="statistics-info" class="custom-icon">i</span></h1>');
$("#statistics-div").append("<h3>Avancerade hp: <span id='sum-advanced-points' class='number-value'></span></h3>");
$("#statistics-div").append("<h3 style='margin-top:5px;'>Grundläggande hp: <span class='number-value'id='sum-other-points'></span></h3>");
$("#statistics-div").append("<h3 style='margin-top:5px;'>Utländska hp: <span class='number-value' id='sum-abroad-n-test-points'></span></h3>");
$("#statistics-div").append("<h3 style='margin-top:5px;'>Totala hp: <span class='number-value'" +
    " id='sum-total-points'></span></h3>");


/*ToolTips for calculate-btn*/
var tooltipStatistics = 'Parantes visar poäng för \n';
tooltipStatistics += 'oavslutade kurser\n';
$('#statistics-info').attr('data-toggle','tooltip');
$('#statistics-info').attr('title',tooltipStatistics);
$('#statistics-info').attr('data-placement','right');




$("body >table:not(:first)").css('margin-left','120px');
$(".results-table").wrap('<div class="col-xs-12"></div>');
