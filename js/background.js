chrome.runtime.onInstalled.addListener(function(details) {
    var d = new Date();
    var estDif = (5 * 60 - d.getTimezoneOffset()) / 60;
    var todayN = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 9 + estDif);
    var tomorrowN = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1, 9 + estDif);
    var onejan = new Date(d.getFullYear(), 0, 1);
    var n = Math.ceil((todayN - onejan) / 86400000);
    if (d.getTime() < todayN.getTime()) {
        n = n - 1;
    }
    chrome.storage.local.set({'dayNum': n});
    if (details.reason === "update") {
        chrome.alarms.get('newIcon', function(alarm) {
            if (1 || !alarm) {
                chrome.alarms.create('newIcon', {when: todayN.getTime()});
            }
        });
    }
    if(details.reason === "install") {
      if (d.getTime() < todayN.getTime()) {
	chrome.alarms.create('newIcon', {when: todayN.getTime()});
      }
      else {
	chrome.alarms.create('newIcon', {when: tomorrowN.getTime()});
      }
    }
});

function checkAlarms(alarm) {
    if (alarm.name === 'newIcon') {
        var d = new Date();
        var estDif = (5 * 60 - d.getTimezoneOffset()) / 60;
        var tomorrowN = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1, 9 + estDif);

        var today = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 9 + estDif);
        var onejan = new Date(d.getFullYear(), 0, 1);
        var n = Math.ceil((today - onejan) / 86400000);
        chrome.storage.local.set({'dayNum': n});

        chrome.browserAction.setIcon({path: 'icon-new.png'});
        chrome.browserAction.setTitle({title: 'I Love To Travel!'});
        chrome.alarms.create('newIcon', {when: tomorrowN.getTime()});
    }
}

chrome.alarms.onAlarm.addListener(checkAlarms);
