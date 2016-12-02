function renderStatus(statusText) {
  document.getElementById("status").textContent = statusText;
}

function renderStatusAfter(statusText) {
  document.getElementById("status-after").textContent = statusText;
}

document.addEventListener("DOMContentLoaded", function() {
  var getitafter = function() {   chrome.proxy.settings.get({}, function(config) {
	  renderStatusAfter(JSON.stringify(config["value"]["mode"]));
	  if (config["value"]["mode"] == "system") {
	      chrome.browserAction.setIcon({"path": "icons/home.png"}, function(){});
	  } else {
	      chrome.browserAction.setIcon({"path": "icons/cloud.png"}, function(){});
	  }
  }); }
  chrome.proxy.settings.get({}, function(config) {
	  renderStatus(JSON.stringify(config["value"]["mode"]));
	  if (config["value"]["mode"] == "system") {
	      var config = {
		  "mode": "fixed_servers",
		  "rules": {
		      "singleProxy": {
			  "scheme": "socks5",
			  "host": "localhost",
			  "port": 2001
		      },
		  }
	      };
	      chrome.proxy.settings.set({"value": config, "scope": "regular"}, getitafter);
	  } else {
	      chrome.proxy.settings.clear({"scope": "regular"}, getitafter);
	  }
  });
});
