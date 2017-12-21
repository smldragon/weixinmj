//$(document).ready(function() {
document.addEventListener("DOMContentLoaded", function(event) {
	initWxConfig();
	//initialRequestPos is defined in startGame.jsp <head> section
	 if ( initialRequestPos !== '') {
        webSocketObj.addSocketOpenListener(initGameJoining);
     }
	webSocketObj.initWebSocket('startGame');
	sendMessageToFriendCircle('我已经开局了，欢迎加入','','');	
	score.calculateNetScores();

	var htmlText = "<font size=3>主办:"+gameAction.hostNickName+"</font>";  //这行可以用CSS和STYLE
    document.getElementById('pageTitle1').innerHTML  = htmlText;
		var htmlText = "<font size=2>开始时间:"+gameAction.startTime+"</font>";  //这行可以用CSS和STYLE
    document.getElementById('pageTitle2').innerHTML  = htmlText;

    scorePageSetting.init();
});
var initGameJoining = {
    //initialRequestPos is defined in startGame.jsp <head> section
    onOpen: function() {
        gameAction.joinGameAtPos(initialRequestPos);
        webSocketObj.rmSocketOpenListener(this);
     }
}
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
//            webSocketObj.addListener(this);
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

           	webSocketObj.sendData('正在退出...',JSON.stringify(jsonString));
        }
//        ,
//        onSuccess: function(jsonData) {
//
//            webSocketObj.rmListener(gameAction.getPlayerListener());
//
//        	 if ( gameAction.getIsHost() === true) {
//                    window.history.back();
//        	 }
//        }
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
	var tempPlayerNameInputId = "TempPlayerName";
	return {
	    pos: '',
	    tempPlayerEntryDivObj: '',
		showEntry: function(pos_) {
		    this.pos = pos_;
		    this.tempPlayerEntryDivObj = document.getElementById(tempPlayerEntryDiv);
		    this.tempPlayerEntryDivObj.style.display='';
		    document.getElementById(tempPlayerNameInputId).focus();
		},
		doOkFunction: function () {
		    var tempPlayerName = document.getElementById(tempPlayerNameInputId).value;
            gameAction.joinGameByMenualUser(tempPlayerName,this.pos);
            document.getElementById(tempPlayerNameInputId).value = '';
        	this.hide();
        },
        doCancelFunction:function () {
        	this.hide();
        },
        hide:   function () {
           this.tempPlayerEntryDivObj.style.display="none";
        },
        getDivID() {
            return tempPlayerEntryDiv;
        }
	};
}();

var addScoreDialog = function() {

    var winPlayer='';
    var winPos = "";
    var scoreMode;
    return {
        addScoreDialogDivId: '',
        addScoreDialogDivObj: '',
        getWinPos: function() {
            return winPos;
        },
        // 0: 胡了; 1:自摸
        getScoreMode: function() {
            return scoreMode;
        },
        doOkFunction: function () {
           score.addScore();
           this.hide();
        },
        doCancelFunction:function () {
            this.hide();
         },
        winThreeOther: function() {
            var winnerScoreInput = getElementInsideContainer(this.addScoreDialogDivId,'winnerScore');
            var score = winnerScoreInput.value;
            if ( score === '') {
                this.hide();
                showTitledMessageWithCallback("分数为空，或格式无效","请重新输入"+winPlayer+"的得分","addScoreDialog.show('"+winPos+"')");
                return;
            }
            var loserScore = score/3;
            var indexOfDot = loserScore.toString().indexOf(".");
            if ( indexOfDot >= 0 ) {
                 this.hide();
                 showTitledMessageWithCallback("错误！","赢分不能被3整除。");
                 return;
            }
            getElementInsideContainer(this.addScoreDialogDivId,'loser1input').value = loserScore;
            getElementInsideContainer(this.addScoreDialogDivId,'loser2input').value = loserScore;
            getElementInsideContainer(this.addScoreDialogDivId,'loser3input').value = loserScore;
        },
        //type: 0 -- 胡了; 1 -- 自摸
        show: function(winnerPos,mode) {
            if ( gameAction.getIsHost() != true) {
                showMessage("你没有权限算分，只有主办才有权限");
                return;
            }
            winPos = winnerPos;
            scoreMode = mode;
            this.addScoreDialogDivObj = document.getElementById(this.addScoreDialogDivId);
            this.addScoreDialogDivObj.style.display='';
            var winnerDiv = getElementInsideContainer(this.addScoreDialogDivId,'position');
            winPlayer = positionConvertor.convertToPlayerName(winnerPos);
            winnerDiv.innerHTML = winPlayer+"的得分:";
            //set losers field properties
            var count=1;
            for(var i=0;i<4;i++) {
                if ( globalVariables.positions[i]=== winPos) {
                    var winnerInputField = getElementInsideContainer(this.addScoreDialogDivId,'winnerScore');
                    winnerInputField.name = globalVariables.positions[i]+'input';
                    winnerInputField.focus();
                    continue;
                }
                var loserDiv = getElementInsideContainer(this.addScoreDialogDivId,'loser'+count);
                var serverValue = globalVariables.playerNames[i];
                loserDiv.innerHTML = positionConvertor.getPlayerNameAtPos(globalVariables.positions[i],serverValue)+'的输分';
                var loserInputDiv = getElementInsideContainer(this.addScoreDialogDivId,'loser'+count+'input');
                loserInputDiv.name = globalVariables.positions[i]+'input';
                count = count+1;
            }
        },
        hide: function() {
            this.addScoreDialogDivObj.style.display="none";
        }
    };
}();