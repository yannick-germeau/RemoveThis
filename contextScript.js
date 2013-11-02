var target;
var isActive = true;
window.addEventListener('contextmenu', function(event){
	removeClass(target,"remove_this_vBan");
	target = event.target || event.srcElement;
	addClass(target, "remove_this_vBan");
});


window.addEventListener('click', function(event){
	removeClass(target,"remove_this_vBan");
});

chrome.extension.onMessage.addListener(function(msg, _, sendResponse) {
	if (msg.action.remove){
		target.parentNode.removeChild(target);
	}
	if (msg.action.isActive){
		isActive = msg.action.isActive;
	}
});
function hasClass(ele,selector) {
	
	var rclass = '/[\n\t\r]/g';
	var className = " " + selector + " ";
	if (ele.nodeType === 1 && (" " + ele.className + " ").replace(rclass, " ").indexOf(className) > -1) {
		return true;
	}
	return false;
}

function addClass(ele,cls) {
	if (isActive && !this.hasClass(ele,cls)) ele.className += " "+cls;
}

function removeClass(elem, value) {
	var className;
	if (elem !== undefined){
		if (elem.className) {
			className = (elem.className).replace(value, "");
			elem.className = trim(className);
		}
	}
}

function trim(text) {
	return text.replace(/^\s+/g,'').replace(/\s+$/g,'');
}