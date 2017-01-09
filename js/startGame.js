$(document).ready(function() {
	initWxConfig();
	// webSocketObj is declared in Function.js -- XFZ@2016-08-25
	//webSocketObj.setSocketOnOpenFunction(startGameOnOpen);
	webSocketObj.initWebSocket('startGame');
	sendMessageToFriendCircle('我已经开局了，欢迎加入','','');	
	score.calculateNetScores();

	var htmlText = "<font size=3>庄家:"+gameAction.hostNickName+"</font>";  //这行可以用CSS和STYLE
    document.getElementById('pageTitle1').innerHTML  = htmlText;
		var htmlText = "<font size=2>开始时间:"+gameAction.startTime+"</font>";  //这行可以用CSS和STYLE
    document.getElementById('pageTitle2').innerHTML  = htmlText;
});
function startGameOnOpen(msg) {
	//$(socket).bind('message',handleScoreWebSocketResponse); 
	//$(socket).bind('message',setPlayers); 
	//webSocketObj.bind(score.handleScoreWebSocketResponse); 
	//webSocketObj.bind(gameAction.setPlayers); 
}
var exitGame = function() {
    var type = globalVariables.webSocketGameEvent;
    return {
        getType : function() {
            return type;
        },
        requestExit: function() {
            webSocketObj.addListener(this);
            if ( gameAction.getIsHost() === true) {
                dialog.title="";
                dialog.message = "退出将会关闭这局<br><br>您确认要退出本局吗?";
                    dialog.okButtonText = "确定";
                    dialog.cancelButtonText = "取消";
                    dialog.okFunction = "exitGame.postExitRequest()";
                    dialog.cancelFunction = "";
                    dialog.show();
            } else {
                exitGame.postExitRequest()
            }
        },
        postExitRequest: function() {

            var jsonString = {};
            jsonString[globalVariables.GameIdName] = gameAction.getGameId();
             jsonString[globalVariables.OpenIdName] =  webSocketObj.getOpenId();
             jsonString[globalVariables.WebSocketEventTypeHandler ] = type;
             jsonString[globalVariables.MessageModeHandler ] = gameAction.getExitGameMode();
             jsonString[globalVariables.MessageActionHandler] = gameAction.getChangeGameAction();

           	webSocketObj.sendData(JSON.stringify(jsonString));
           	loadingPrompt.show('正在退出...');
        },
        onSuccess: function(jsonData) {
             alert('remove listener at startGame.js line 51');
        	 if ( gameAction.getIsHost() === true) {
                    window.history.back();
        	 }
        }
    }
}();
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
var enterTempPlayer = function() {
	var tempPlayerEntryDiv = "tempPlayerEntryDiv";
	return {
	    pos: '',
	    tempPlayerEntryDivObj: '',
		showEntry: function(pos_) {
		    this.pos = pos_;
		    this.tempPlayerEntryDivObj = document.getElementById(tempPlayerEntryDiv);
		    this.tempPlayerEntryDivObj.style.display='';
		},
		doOkFunction: function () {
		    var tempPlayerName = document.getElementById('TempPlayerName').value;
            gameAction.joinGameByMenualUser(tempPlayerName,this.pos);
        	this.hide();
        },
        doCancelFunction:function () {
        	this.hide();
        },
        hide:   function () {
           // $("#"+tempPlayerEntryDiv).remove();
           this.tempPlayerEntryDivObj.style.display="none";
        }
	};
}();