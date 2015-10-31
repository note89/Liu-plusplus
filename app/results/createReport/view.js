var collectReportData = function () {

    return {
        points: sumPointsInLevels(),
        grades: {
            average: 3.7,
            weighedAverage: 3.4
        },
        courses: [{
            code: "TDDD48",
            name: 'automatiserad Plannering',
            points: 5,
            grade: 3,
            level: "G1",
            done: true
            },
            {
                code: "TDDD56",
                name: 'Multicore- och GPU-Programmering',
                points: 6,
                grade: 4,
                level: "A",
                done: false
            },
            {
                code: "TDDD55",
                name: 'Kompilatorer och interpretatorer',
                points: 6,
                grade: 4,
                level: "A",
                done: true
            },
            {
                code: "TDDD38",
                name: 'Avancerad C++',
                points: 6,
                grade: 4,
                level: "A",
                done: false
            },
            {
                code: "TAMS65",
                name: 'Matematisk statistik I, fortsättningskurs',
                points: 6,
                grade: 4,
                level: "G1",
                done: false
            }
        ]
    };


}


var fillModal = function () {

    var reportData = collectReportData();
    var pre = "<pre>\n";
    var preEnd = "</pre>"
    var reportMiddleString = "";
    var linebreak = "\n";
    var delimiter = "--------------------"+linebreak;

    console.log(reportData);

    var createHeading = function (heading) {
        var headingString = delimiter
        headingString += heading+ linebreak;
        headingString +=delimiter;
        return headingString;
    }

    var prettyPrintLevel = function (level) {
        return level.done + " + (" + level.todo + ") " + " = " + level.total +"\n"
    }

    var prettyPrintLevelOthers = function (levelPoints) {
        var done = levelPoints.G1.done + levelPoints.G2.done + levelPoints.empty.done;
        var todo = levelPoints.G1.todo + levelPoints.G2.todo + levelPoints.empty.todo;
        var total = levelPoints.G1.total + levelPoints.G2.total + levelPoints.empty.total;
        return done + " + (" + todo + ") " + " = " + total+"\n"
    }


    var addGeneralInfo = function (reportData) {
        var generalString = createHeading("Poäng (kommande)");
        generalString += "A: " + prettyPrintLevel(reportData.points.A);
        generalString += "G1G2: " + prettyPrintLevelOthers(reportData.points);
        generalString += "Credits: " + reportData.points.credits.abroad + " + (" + reportData.points.credits.tests + ") =" +
            " " + reportData.points.credits.total + "\n";
        generalString += "Totalt: " + reportData.points.sum.done + " + (" + reportData.points.sum.todo + ") = " + reportData.points.sum.total + "\n";
        return generalString;
    }

    var coursesInfo = function (reportData) {
        var courseString = "---Kurser---" + linebreak;
        var sortedCourses = _.sortByAll(reportData.courses, ['done', 'level']);
        var courseString = createHeading("Kommande Kurser");
        courseString += "Kod\tPoäng\tNivå"+linebreak;
        _(sortedCourses).forEach(function(course) {
            if (course.done === true) return false;
            courseString += course.code + "\t" + course.points + "\t" + course.level + linebreak;
        }).value();
        courseString += createHeading("Avklarade Kurser");
        courseString += "Kod\tPoäng\tNivå"+linebreak;
        _(sortedCourses).forEach(function(course) {
            if(course.done === true)
            {
                courseString += course.code + "\t" + course.points + "\t" + course.level + linebreak;
            }
        }).value();

        return courseString;
    }

    /// coursesInfo(reportData);


    return addGeneralInfo(reportData) + coursesInfo(reportData)


};


/* Button trigger modal */
var createReportBtn = "";
createReportBtn += "<button type=\"button\" class=\"btn btn-primary btn-lg\" data-toggle=\"modal\" data-target=\"#myModal\">";
createReportBtn += "    Launch demo modal";
createReportBtn += "<\/button>";
createReportBtn += "";


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
modal += "    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close<\/button>";
modal += "    <button type=\"button\" class=\"btn btn-primary\">Save changes<\/button>";
modal += "<\/div>";
modal += "<\/div>";
modal += "<\/div>";
modal += "<\/div>";


/* REPORT */
$("#info-container").append("<div id='report-div' class='col-xs-3 text-center'></div>");
$("#report-div").append(createReportBtn);
$("#report-div").append(modal);
