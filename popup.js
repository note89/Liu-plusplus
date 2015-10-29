document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {
    console.log('click');
    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.create({ url: "https://github.com/Niler851/studentportalen-extended/issues" });
    });
  }, false);
}, false);