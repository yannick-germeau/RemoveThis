function undoRemoveThis() {
  return function(info, tab) {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage( tab.id, {action : { undo : true}});
      })
  };
};

chrome.contextMenus.create({
  "title" : "Undo Remove This",
  "type" : "normal",
  "contexts" : ["all"],
  "onclick" : undoRemoveThis(),
});
