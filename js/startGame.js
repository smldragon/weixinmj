$(document).ready(function() {
	initWxConfig();
	// webSocketObj is declared in Function.js -- XFZ@2016-08-25
	//webSocketObj.setSocketOnOpenFunction(startGameOnOpen);
	webSocketObj.initWebSocket('startGame');
	sendMessageToFriendCircle('我已经开局了，欢迎加入','','');	
	score.calculateNetScores();

});
function startGameOnOpen(msg) {
	//$(socket).bind('message',handleScoreWebSocketResponse); 
	//$(socket).bind('message',setPlayers); 
	//webSocketObj.bind(score.handleScoreWebSocketResponse); 
	//webSocketObj.bind(gameAction.setPlayers); 
}
var scoreHist = function() {
	
	//the element is defined in startGame.jsp
	var scoreHistDivId = 'scoreHistDiv';
	var scoreSummaryDivId = 'scoreSummaryDiv';
	var scoreConfigSettingDivId = 'scoreConfigSettingDiv';
	
	return {
		toggleScoreHist: function() {
			
			var scoreSummaryDivObj = document.getElementById(scoreSummaryDivId);
			var scoreHistDivObj = document.getElementById(scoreHistDivId);
			
			if ( isObjectVisible(scoreSummaryDivObj)) {
				horizontalToggle.slideFromRight(scoreHistDivObj);
				horizontalToggle.slideFromRight(scoreSummaryDivObj);
			} else {
				horizontalToggle.slideFromLeft(scoreHistDivObj);
				horizontalToggle.slideFromLeft(scoreSummaryDivObj);
			}
		},
		toggleScoreConfig: function() {
			
			var scoreSummaryDivObj = document.getElementById(scoreSummaryDivId);
			var scoreConfigSettingDivObj = document.getElementById(scoreConfigSettingDivId);
			
			if ( isObjectVisible(scoreSummaryDivObj)) {
				horizontalToggle.slideFromRight(scoreConfigSettingDivObj);
				horizontalToggle.slideFromRight(scoreSummaryDivObj);
			} else {
				horizontalToggle.slideFromLeft(scoreConfigSettingDivObj);
				horizontalToggle.slideFromLeft(scoreSummaryDivObj);
			}
		}
	};
}();
function joinGame() {
	$(socket).bind('message',setPlayers); 
	sendData(JSON.stringify(
		//server filters listener by type, WebSocketEventTypeHandler is defined in js_inc.jsp -- XFZ@2016-08-25, 
		{WebSocketEventTypeHandler: webSocketGameEvent,'action': 'joingame','openId': openId, gameId: gameId,position: position}
	));
}