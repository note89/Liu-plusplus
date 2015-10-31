var collectReportData = function () {




    return {
        points: {
            A: {
                done: 23,
                todo: 12,
                total: 44
            },
            G1G2: {
                done: 23,
                todo: 12,
                total: 44
            },
            credits: {
                abroad: 30,
                test: 0,
                total: 30
            },
            all: {
                done: 23,
                todo: 12,
                total: 44
            }
        },
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

    var createHeading = function (heading) {
        var headingString = delimiter
        headingString += heading+ linebreak;
        headingString +=delimiter;
        return headingString;
    }


    var addGeneralInfo = function (reportData) {
        var generalString = createHeading("Poäng (kommande)");
        generalString += "A: " + reportData.points.A.done + " + (" + reportData.points.A.todo + ") = " + reportData.points.A.total + "\n";
        generalString += "G1G2: " + reportData.points.G1G2.done + " + (" + reportData.points.G1G2.todo + ") = " + reportData.points.G1G2.total + "\n";
        generalString += "Credits: " + reportData.points.credits.abroad + " + (" + reportData.points.credits.test + ") =" +
            " " + reportData.points.credits.total + "\n";
        generalString += "Totalt: " + reportData.points.all.done + " + (" + reportData.points.all.todo + ") = " + reportData.points.all.total + "\n";
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


    return pre + addGeneralInfo(reportData) + coursesInfo(reportData) + preEnd;


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
modal += fillModal();
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
