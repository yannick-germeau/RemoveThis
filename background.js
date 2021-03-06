var rmThis = {
	isOpen : false,
	tabsList : []
};


rmThis.setActive = function (tab){
	var self = this;
	if (self.tabsList[tab.id].active ) {
		
		chrome.browserAction.setIcon({path: 'icon-large-active.png', tabId:tab.id});
		chrome.tabs.executeScript(tab.id, {file:"contextScript.js"});
		if (!self.isOpen){
			chrome.contextMenus.create({
			  "title" : "Remove This",
			  "type" : "normal",
			  "contexts" : ["all"],
			  "onclick" : rmThis.removeThis(),
			});
			self.isOpen = true;
		}
	}else{
	    chrome.browserAction.setIcon({path: "icon-large.png", tabId:tab.id});
	    chrome.tabs.executeScript(tab.id, {code:"isActive=false;"});
	    chrome.contextMenus.removeAll();
	    self.isOpen = false;
  	}
}
rmThis.removeThis = function() {
	return function(info, tab) {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tab.id, {action : { remove : true}});
		})
	};
};
rmThis.setDefault = function (tabId){
	var settings = {
		active : false,
		alreadyLoad : false
	};
	rmThis.tabsList[tabId] = settings;
}
chrome.tabs.onCreated.addListener(function(tab){	
	rmThis.setDefault(tab.id);
	console.log (tabsList, 'created');
	
});
/* EVENTS */
chrome.tabs.onUpdated.addListener(function(tabId , changeInfo, tab){	
	if (changeInfo.status == "loading"){

		if(rmThis.tabsList[tab.id] == undefined){
			rmThis.setDefault(tab.id);
		}
		rmThis.setActive(tab);
	}
	
});

chrome.tabs.onRemoved.addListener(function(tabId , removeInfo){	
	rmThis.tabsList.splice(tabId, 1);
});

chrome.browserAction.onClicked.addListener(function(tab){
	if(rmThis.tabsList[tab.id] == undefined){
		rmThis.setDefault(tab.id);
	}
	rmThis.tabsList[tab.id].active = !rmThis.tabsList[tab.id].active;

	rmThis.setActive(tab);

});








