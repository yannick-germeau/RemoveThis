var isActive = isActive || false;
var tabsList = [];
var menuIsSet= false;
function setActive(tab){
	if (tabsList[tab.id].active ) {
		
		chrome.browserAction.setIcon({path: 'icon-large-active.png', tabId:tab.id});
		chrome.tabs.executeScript(tab.id, {file:"contextScript.js"});
		if (!menuIsSet){
			chrome.contextMenus.create({
			  "title" : "Remove This",
			  "type" : "normal",
			  "contexts" : ["all"],
			  "onclick" : removeThis(),
			});
			menuIsSet = true;
		}
	}else{
	    chrome.browserAction.setIcon({path: "icon-large.png", tabId:tab.id});
	    chrome.tabs.executeScript(tab.id, {code:"isActive=false;"});
	    chrome.contextMenus.removeAll();
	    menuIsSet = false;
  	}
}
function removeThis() {
	return function(info, tab) {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tab.id, {action : { remove : true}});
		})
	};
};
function setDefault(tabId){
	var settings = {
		active : false,
		alreadyLoad : false
	};
	tabsList[tabId] = settings;
}
chrome.tabs.onCreated.addListener(function(tab){	
	setDefault(tab.id);
	console.log (tabsList, 'created');
	
});
/* EVENTS */
chrome.tabs.onUpdated.addListener(function(tabId , changeInfo, tab){	
	if (changeInfo.status == "loading"){

		if(tabsList[tab.id] == undefined){
			setDefault(tab.id);
		}
		setActive(tab);
	}
	
});

chrome.tabs.onRemoved.addListener(function(tabId , removeInfo){	
	tabsList.splice(tabId, 1);
});

chrome.browserAction.onClicked.addListener(function(tab){
	if(tabsList[tab.id] == undefined){
		setDefault(tab.id);
	}
	tabsList[tab.id].active = !tabsList[tab.id].active;

	setActive(tab);

});








