document.addEventListener("DOMContentLoaded", function () {
  let flag8 = 0;

  var replaceButton = document.getElementById("replaceButton");
  replaceButton.addEventListener("click", function (event) {
    event.preventDefault();
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs && tabs.length > 0) {
        var activeTab = tabs[0];
        chrome.scripting.executeScript(
          {
            target: { tabId: activeTab.id },
            func: contentScriptFunction, // Pass the function itself, not its invocation
            args: [flag8], // Pass arguments here
          },
          (results) => {
            // Toggle flag8 for next use
            if (results && results.length > 0) {
              flag8 = results[0].result;
            }
          }
        );
      } else {
        console.error("No active tab found.");
      }
    });
  });
});

function contentScriptFunction(flag8) {
  var elements = document.getElementsByTagName("*");
  let searchPattern = /Alex/gi;
  let replacementText = "heavenly beauty";

  if (flag8 % 2 !== 0) {
    searchPattern = /heavenly beauty/gi;
    replacementText = "Alex";
  }

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

  // Return the toggled flag value.
  return 1 - flag8;
}
