//$(document).ready(function() {
document.addEventListener("DOMContentLoaded", function(event) {
	initWxConfig();
	// webSocketObj is declared in Function.js -- XFZ@2016-08-25
	//webSocketObj.setSocketOnOpenFunction(startGameOnOpen);
	webSocketObj.initWebSocket('changeScoreSetting');
	
	showScoreConfigModifier('player',scoreConfig.getPlayerScoreConfig());
	/** to change game's score config, call following 
		showScoreConfigModifier('game',scoreConfig.getGameScoreConfig());
	*/
	initConfig();
});

function showScoreConfigModifier(scoreConfigSettingType,scoreConfigValue) {
	setScoreConfig(scoreConfigSettingType,scoreConfigValue);
	//scoreHist.toggleScoreConfig();
}
function initConfig() {
//    see I:\workspacesIdea\majiang\weixinmj\ScoreSettingEmbeded.jsp to obtain all config names.
//    var configNames = new Array();
//    var  = new Map();
//    var keyString = "a string",
//        keyObj = {},
//        keyFunc = function () {};
//
//    // setting the values
//    myMap.set(keyString, "value associated with 'a string'");
//    myMap.set(keyObj, "value associated with keyObj");
//    myMap.set(keyFunc, "value associated with keyFunc");
//
//    myMap.size; // 3
//
//    // getting the values
//    myMap.get(keyString);    // "value associated with 'a string'"
//    myMap.get(keyObj);       // "value associated with keyObj"
//    console.log(myMap.get(keyFunc));      // "value associated with keyFunc"
}
