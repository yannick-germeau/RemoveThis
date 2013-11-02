
function removeThis() {
  return function(info, tab) {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage( tab.id, {action : { remove : true}});
      })
  };
};




chrome.contextMenus.create({
  "title" : "Remove This",
  "type" : "normal",
  "contexts" : ["all"],
  "onclick" : removeThis(),

});
/**/




