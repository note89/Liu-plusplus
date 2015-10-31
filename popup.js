document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {
    console.log('click');
    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.create({ url: "https://github.com/Niler851/studentportalen-extended/issues" });
    });
  }, false);
}, false);


var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-69515833-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

function trackButton(e) {
  _gaq.push(['_trackEvent', e.target.id, 'clicked']);
};

var buttons = document.querySelectorAll('button');
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', trackButtonClick);
}