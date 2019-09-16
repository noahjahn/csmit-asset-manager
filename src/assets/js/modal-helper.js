function appendModalContent(selector, content) {
    var originalTitle = $(selector).text();
    $(selector).text(function(index, currentContent) {
        return currentContent + " " + content;
    });
    return originalTitle;
}

function resetModal(selectors, originalTitle, originalBody) {

}

/* https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
