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
});

function showScoreConfigModifier(scoreConfigSettingType,scoreConfigValue) {
	setScoreConfig(scoreConfigSettingType,scoreConfigValue);
	//scoreHist.toggleScoreConfig();
}