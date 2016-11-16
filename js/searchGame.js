/**
*  this file is no longer needed anymore -- XFZ@2016-09-08
*/
$(document).ready(function() {
	initWxConfig();
	// webSocketObj is declared in Function.js  -- XFZ@2016-08-25
	//webSocketObj.setSocketOnOpenFunction(searchGameOnOpen);
	webSocketObj.initWebSocket('searchGame');
});

function searchGameOnOpen(msg) {
	//$(socket).bind('message',setPlayers); 
	//webSocketObj.bind(gameAction.setPlayers);
}
