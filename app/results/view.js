/*
Bootstrapify
 */
$("td[width='*']").wrapInner("<div class='container pull-left' id='studyresults-main-container'></div>");   //Main rights sidepanel wrapper
$("#studyresults-main-container > h1 , #studyresults-main-container > h1~form")
    .wrapAll("<div class='container pull-left' id='study-results-selector-div'><div class='col-xs-12'></div></div>"); // Studyresults


$("[name='post_button_select_filter']").addClass("btn btn-primary").css("margin-top","10px");


/*
 Create area for grade info
 */
$("#study-results-selector-div").after("<div id='info-container' class='container pull-left'></div>");
$("#info-container").append("<div id='snitt'" +
    " class='col-xs-3'><h1>Snitt</h1></div>");
$("#snitt").append("<h3>Viktat: <span id='weighted-average-grade'></span></h3>");
$("#snitt").append("<h3 style='margin-top:5px;'>Oviktat: <span id='average-grade'></span></h3>");
$("#snitt").append("<p>Avklarade <input id='select-all-done' type='checkbox'></p>");
$("#snitt").append("<p><button id='calculate-btn' type='button' class='btn btn-success'>Beräkna</button></p>");

$("#info-container").append("<div id='course-level' class='col-xs-3'></div>");
$("#course-level").append("<h1>Statestik</h1>");
$("#course-level").append("<h3>Avancerade hp: <span id='sum-advanced-points'></span></h3>");

$("body >table:not(:first)").css('margin-left','120px');
$(".results-list").css('width','100%');
$(".resultlist").wrap('<div class="col-xs-12"></div>');