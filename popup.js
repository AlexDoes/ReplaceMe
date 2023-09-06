// popup.js

document.addEventListener("DOMContentLoaded", function () {
  let flag8 = 0;
  var replaceButton = document.getElementById("replaceButton");
  replaceButton.addEventListener("click", function (event) {
    // Prevent the default behavior of the click event
    event.preventDefault();
    console.log("pretab check");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      console.log("chrome.tabs.query callback executed");
      if (tabs && tabs.length > 0) {
        var activeTab = tabs[0];
        console.log("hello");
        chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          function: replaceText(flag8),
        });
      } else {
        console.error("No active tab found.");
      }
    });
  });
});

function replaceText(flag8) {
  console.log(flag8);
  console.log("hello");
  var elements = document.getElementsByTagName("*");
  let searchPattern = /Alex/gi;
  let replacementText = "heavenly beauty";

  if (flag8 % 2 !== 0) {
    searchPattern = /heavenly beauty/gi;
    replacementText = "Alex";
  }
  //   console.log(flag);

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    if (element.hasChildNodes()) {
      for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === Node.TEXT_NODE) {
          node.textContent = node.textContent.replace(
            searchPattern,
            replacementText
          );
        }
      }
    }
  }
  flag8++;
}
