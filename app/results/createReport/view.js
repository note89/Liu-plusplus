var collectReportData = function () {

    return {
        points: sumPointsInLevels(),
        grades: {
            average: 3.7,
            weighedAverage: 3.4
        },
        courses: getCourseArray()
    };


}

var getCourseArray = function () {
    var selectedRows = $(".course-checkbox:checked").parent().parent();

    var courseArray = [];

    _(selectedRows).forEach(function (course) {
        var courseCode = $(course).find('.course-code').text();
        var courseName = $(course).find('.course-name').text();
        var coursePoints = $(course).find('.hp').text();
        var courseGrade = $(course).find('.course-grade').text();
        var courseLevel = $(course).find('.course-levels').val();
        var couseDone = $(course).hasClass('is-finished');

        var course = {
            code: courseCode,
            name: courseName,
            points: coursePoints,
            grade: courseGrade,
            level: courseLevel,
            done: couseDone
        }

        courseArray.push(course);


    }).value()

    return courseArray;

}


var fillModal = function () {
    var reportData = collectReportData();
    var pre = "<pre>\n";
    var preEnd = "</pre>"
    var reportMiddleString = "";
    var linebreak = "\n";
    var delimiter = "--------------------" + linebreak;


    var createHeading = function (heading) {
        var headingString = delimiter
        headingString += heading + linebreak;
        headingString += delimiter;
        return headingString;
    }

    var prettyPrintLevel = function (level) {
        return level.done + " + (" + level.todo + ") " + " = " + level.total + "\n"
    }

    var prettyPrintLevelOthers = function (levelPoints) {
        var done = levelPoints.G1.done + levelPoints.G2.done + levelPoints.empty.done;
        var todo = levelPoints.G1.todo + levelPoints.G2.todo + levelPoints.empty.todo;
        var total = levelPoints.G1.total + levelPoints.G2.total + levelPoints.empty.total;
        return done + " + (" + todo + ") " + " = " + total + "\n"
    }


    var addGeneralInfo = function (reportData) {
        var generalString = createHeading("Poäng + (kommande)");
        generalString += "A: " + prettyPrintLevel(reportData.points.A);
        generalString += "G1G2: " + prettyPrintLevelOthers(reportData.points);
        generalString += "Credits: " + reportData.points.credits.abroad + " + (" + reportData.points.credits.tests + ") =" +
            " " + reportData.points.credits.total + "\n";
        generalString += "Totalt: " + reportData.points.sum.done + " + (" + reportData.points.sum.todo + ") = " + reportData.points.sum.total + "\n";
        return generalString;
    }

    var coursesInfo = function (reportData) {
        var courseString = linebreak;
        var sortedCourses = _.sortByAll(reportData.courses, ['done', 'level']);

        var hasUnfinishedCourses = _.findIndex(sortedCourses, 'done', false) > -1;


        if (hasUnfinishedCourses) {
            courseString += createHeading("Kommande Kurser");
            courseString += "Kod\t\tPoäng\t\tNivå" + linebreak;
            _(sortedCourses).forEach(function (course) {
                if (course.done === true) return false;
                courseString += course.code + "\t\t" + course.points + "\t\t" + course.level + linebreak;
            }).value();

        }


        courseString += createHeading("Avklarade Kurser");
        courseString += "Kod\t\tPoäng\t\tNivå" + linebreak;
        _(sortedCourses).forEach(function (course) {
            if (course.done === true) {
                courseString += course.code + "\t\t" + course.points + "\t\t" + course.level + linebreak;
            }
        }).value();

        return courseString;
    }


    return addGeneralInfo(reportData) + coursesInfo(reportData)


};


/* Button trigger modal */
var createReportBtn = "";
createReportBtn += '<div class="btn-group" role="group"><button type=\"button\" id="create-report" class=\"btn' +
    ' btn-primary' +
" btn-lg\"" +
    " data-toggle=\"modal\"" +
    " data-target=\"#myModal\">";
createReportBtn += "Skapa rapport";
createReportBtn += '</button>'
createReportBtn += '<button type="button" id="report-info-btn" class="btn btn-lg btn-primary">?</button>';
createReportBtn += "</div>";


/* Modal */
var modal = "";
modal += "<div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">";
modal += "    <div class=\"modal-dialog\" role=\"document\">";
modal += "    <div class=\"modal-content\">";
modal += "    <div class=\"modal-header\">";
modal += "    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;<\/span><\/button>";
modal += "<h4 class=\"modal-title\" id=\"myModalLabel\">Raport<\/h4>";
modal += "<\/div>";
modal += "<div class=\"modal-body\">";
modal += "<pre id='modal-text'>Välj vilka kurser du vill inkludera först</pre>";
modal += "<\/div>";
modal += "<div class=\"modal-footer\">";
modal += "    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Stäng<\/button>";
modal += "<\/div>";
modal += "<\/div>";
modal += "<\/div>";
modal += "<\/div>";


/* REPORT */
$("#info-container").append("<div id='report-div' class='col-xs-3 text-center'></div>");
$("#report-div").append(createReportBtn);
$("#report-div").append(modal);

///*ToolTips for calculate-btn*/
var tooltipReport = 'Sammanställning av \n';
tooltipReport += 'statestisk för markerade kurser\n';
$('#report-info-btn').attr('data-toggle','tooltip');
$('#report-info-btn').attr('title',tooltipReport);
$('#report-info-btn').attr('data-placement','bottom');





$('#create-report').click(function (event) {
    $("#calculate-btn").click();
})