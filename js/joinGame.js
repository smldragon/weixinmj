$(document).ready(function() {
	initWxConfig();
	// socketOnOpenFunction is declared in Function.js to point to onOpen function -- XFZ@2016-08-25
	socketOnOpenFunction = joinGame;
	initWebSocket('joinGame');
});
function joinGame() {
	$(socket).bind('message',setPlayers); 
	sendData(JSON.stringify(
		//server filters listener by type, WebSocketEventTypeHandler is defined in js_inc.jsp -- XFZ@2016-08-25, 
		{WebSocketEventTypeHandler: webSocketGameEvent,'action': 'joingame','openId': openId, gameId: gameId,position: position}
	));
}

