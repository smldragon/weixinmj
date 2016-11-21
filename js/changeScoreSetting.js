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
//CellSelection is defined in Functions.js, 
//the css class "weui-icon-success-no-circle" is defined in weui.css. same value as used in changeScoreSetting.jsp <i> tag
var scoreConfigSelection = new CellSelection("scoreSetting","weui-icon-success-no-circle"); 
	
var playerSetting = function (){
	
	//this variable is set on changeScoreSetting.jsp
	var scoreConfigSetting;
	
	return {
		
		setScoreConfigSetting : function(scoreConfigSetting_) {
			scoreConfigSetting = scoreConfigSetting_;
		},
		getScoreConfigSetting: function() {
			return scoreConfigSetting;
		},
		setDefaultSelectedItem: function() {
			scoreConfigSelection.setValue(scoreConfigSetting);
		}
	}
}();