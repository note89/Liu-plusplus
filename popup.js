document.addEventListener('DOMContentLoaded', function () {
    var suggestionsBtn = document.getElementById('suggestionsBtn');
    var studentportalBtn = document.getElementById('studentportalBtn');
    var bookARoomBtn = document.getElementById('bookARoomBtn');
    suggestionsBtn.addEventListener('click', function () {
        chrome.tabs.getSelected(null, function (tab) {
            chrome.tabs.create({url: "https://github.com/Niler851/studentportalen-extended/issues"});
        });
    }, false);

    studentportalBtn.addEventListener('click', function () {
        chrome.tabs.getSelected(null, function (tab) {
            chrome.tabs.create({url: "https://www3.student.liu.se/portal/studieresultat/resultat?show_oavslut=oavslut&show_splitt=splitt&post_button_select_filter=Spara"});
        });
    }, false);

    bookARoomBtn.addEventListener('click', function () {
        chrome.tabs.getSelected(null, function (tab) {
            chrome.tabs.create({url: "https://se.timeedit.net/web/liu/db1/wr_stud/ri1Q8.html"});
        });
    }, false);


    var _AnalyticsCode = 'UA-69515833-1';
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', _AnalyticsCode]);
    _gaq.push(['_trackPageview']);

    (function () {

        var ga = document.createElement('script');
        ga.type = 'text/javascript';
        ga.async = true;
        ga.src = 'https://ssl.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);

    })();

    function trackButtonClick(e) {
        _gaq.push(['_trackEvent', e.target.id, 'clicked']);

    }


    var buttons = document.querySelectorAll('button');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', trackButtonClick);
    }


}, false);






