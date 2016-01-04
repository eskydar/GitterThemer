var body = document.getElementsByTagName("body")[0];
var preloaderDiv = document.createElement("div");

preloaderDiv.classList.add("gitterThemerPreload");

var logo = document.createElement("div");
logo.classList.add("preloadLogo");

preloaderDiv.appendChild(logo);

body.appendChild(preloaderDiv);

setTimeout(function() {
  preloaderDiv.classList.add('fadeAway');
  setTimeout(function() {
    preloaderDiv.remove();
  }, 2000);
}, 1500);