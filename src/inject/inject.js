chrome.storage.sync.get('betterGitterTheme', function (result) {
	themeHandler(result.betterGitterTheme);
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
	for (var key in changes) {
		var storageChange = changes[key];
		if (key === "betterGitterTheme") {
			themeHandler(storageChange.newValue);
		}
	}
});

function themeHandler(data) {
	var currentStyle = document.getElementsByClassName('betterGitterStyleSheet')[0];
	if(currentStyle) currentStyle.remove();
	if (data !== 'default') {
		var path = chrome.extension.getURL('src/themes/'+ data +'.css');
		appendScript(path);
	}
}

function appendScript(pathToScript) {
	var head = document.getElementsByTagName("head")[0];
	var link = document.createElement("link");
	link.type = "text/css";
	link.rel  = "stylesheet";
	link.href = pathToScript;
	link.classList.add('betterGitterStyleSheet');
	head.appendChild(link);
}