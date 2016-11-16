$(document).ready(function() {
	initWxConfig();
	// webSocketObj is declared in Function.js -- XFZ@2016-08-25
	//webSocketObj.setSocketOnOpenFunction(startGameOnOpen);
	webSocketObj.initWebSocket('changeScoreSetting');
	setDefaultSetting();

});
function setDefaultSetting() {
	playerSetting.setDefaultSelectedItem();
}

var playerSetting = function (){
	
	//this variable is set on changeScoreSetting.jsp
	var scoreConfigSetting;
	
	return {
		
		setScoreConfigSetting : function(scoreConfigSetting_) {
			scoreConfigSetting = scoreConfigSetting_;
		},
		setDefaultSelectedItem: function() {
			selectTagMethod.setSelectedByValue('scoreSetting',scoreConfigSetting);
		}
	}
}();