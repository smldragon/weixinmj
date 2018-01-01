var netScoreFuncConfig = function() {
    function win3Others() {
        var positions = globalVariables.positions;
        var inputValue = document.getElementById("gameScore").value;
        var winnerPos = addScoreDialog.getWinPos();
        //document.getElementById('loserScores').style.visibility  = 'visible';
        score.setScore(winnerPos,parseInt(inputValue)*3);
        for(var i=0;i<4;i++) {
            if ( positions[i]===winnerPos){
                continue;
            }
            score.setScore(positions[i],parseInt(inputValue));
        }
    }
    return {
        //configuration suffix is resolved in scoreConfig.netScoreFunction()  -- XFZ@2017-12-19
        netScoreFunc_FZ : {
            calculate: function() {
                var totalOf4 = 0;
                    for(var index = 0;index<4;index++) {
                        var pt = globalVariables.positionTotal[index];
                        totalOf4 = totalOf4 + parseInt(pt);
                    };
            },
            onGameScoreInput: function() {
                 win3Others();
                 for(var i=1;i<4;i++) {
                    document.getElementById("loser"+i+"buttonDiv").style.visibility = 'hidden';
                    document.getElementById("loser"+i+"input").style.width = "80%";
                 }
            },
            getScoreMethod: function() {
                return 0;
            }
        },
        netScoreFunc_SH  : {
            calculate: function() {
                netScoreFuncConfig.netScoreFunc_Default.calculate();
            },
            onGameScoreInput: function() {
                netScoreFuncConfig.netScoreFunc_Default.onGameScoreInput();
            },
            getScoreMethod: function() {
                return netScoreFuncConfig.netScoreFunc_Default.getScoreMethod();
            }
        },
        netScoreFunc_NJ : {
            calculate: function() {
                netScoreFuncConfig.netScoreFunc_Default.calculate();
            },
            onGameScoreInput: function(inputFieldId) {
                netScoreFuncConfig.netScoreFunc_Default.onGameScoreInput();
            },
            getScoreMethod: function() {
                return netScoreFuncConfig.netScoreFunc_Default.getScoreMethod();
            }
        },
        netScoreFunc_Default : {
            calculate: function() {
                var totalOf4 = 0;
                for(var index = 0;index<4;index++) {
                    var pt = globalVariables.positionTotal[index];
                       totalOf4 = totalOf4 + parseInt(pt);
                };
            },
            onGameScoreInput: function() {
                var scoreMode = addScoreDialog.getScoreMode();
                var loserButtonText;
                if ( 1 === scoreMode) {
                    //自摸
                    win3Others();
                    loserButtonText="包冲";
                } else {
                    loserButtonText="点炮";
                    var positions = globalVariables.positions;
                    var inputValue = document.getElementById("gameScore").value;
                    var winPos = addScoreDialog.getWinPos();
                    //document.getElementById('loserScores').style.visibility  = 'visible';
                    score.setScore(winPos,parseInt(inputValue));
                    for(var i=0;i<4;i++) {
                        if ( positions[i]===winPos){
                            continue;
                        }
                        score.setScore(positions[i],'');
                    }
                }

                 for(var i=1;i<4;i++) {
                    document.getElementById("loser"+i+"buttonDiv").style.visibility = "visible";
                    document.getElementById("loser"+i+"buttonDiv").style.width = "25%";
                    document.getElementById("loser"+i+"button").innerHTML = loserButtonText;
                    document.getElementById("loser"+i+"inputDiv").style.width = "25%";
                 }
            },
            getScoreMethod: function() {
                return 1;
            }
        },
        //点炮,只有点炮方付钱，其他不付钱
        dianPao: function(loserIndex,position) {
            var scoreMode = addScoreDialog.getScoreMode();
            var gameScore = document.getElementById("gameScore").value;
            var winPos = addScoreDialog.getWinPos();
            //clear loser scores
            for(var i=0;i<4;i++) {
                if ( globalVariables.positions[i] === winPos) {
                    continue;
                }
                score.setScore(globalVariables.positions[i],0);
            }

            for ( var i=1;i<4;i++) {
                var dianPaoPosInput= document.getElementById("loser"+i+"input");
                if ( i === loserIndex) {
                    if ( 0 === scoreMode ) {
                        dianPaoPosInput.value = gameScore;
                    } else {
                        dianPaoPosInput.value = gameScore*3;
                    }
                    score.setScore(position,parseInt(dianPaoPosInput.value));
                } else {
                    dianPaoPosInput.value = 0;
                }
            }
        },
        //用户输入
        onLoserInput:function(loserIndex,position) {
            var dianPaoPosInput= document.getElementById("loser"+loserIndex+"input");
            var value = parseInt(dianPaoPosInput.value);
            score.setScore(position,value);
        },
        onWinnerInput:function() {
            var winnerInput= document.getElementById("winnerScoreField");
            var value = parseInt(winnerInput.value);
            score.setScore(addScoreDialog.getWinPos(),value);
        }
    };
}();

var scoreConfig = function () {
	
	//gameScoreConfig and playerScoreConfig are defined in startGame.jsp
	var gameScoreConfig;
	var scoreSettingCodes; //defined in startGame.jsp
	var scoreSettingNames; //defined in startGame.jsp
	var positions = globalVariables.positions;
	var positionTotal = globalVariables.positionTotal;
	var positionNet = globalVariables.positionNet;
	var configSettingEvent = globalVariables.webSocketScoreConfigSettingEvent;
	var scoreConfigSettingHandler = globalVariables.scoreConfigSettingHandler;
	var scoreConfigModifierTitleId; //defined in changeScoreSetting.jsp
	
	var scoreConfigSettingListener = {
		
		getType: function(){ return configSettingEvent;},
		onError: function(jsonData,err) {
		    loadingPrompt.hide();
			showTitledMessage("设置错误",err);
		},
		onSuccess: function(jsonData) {
			var newConfig = jsonData[scoreConfigSettingHandler];
			scoreConfig.setGameScoreConfig(newConfig);
			if ( gameAction.getIsHost() === true ) {
                //when changeScoresetting.jsp is a div of startGame.jsp, use scoreHist.toggleSecoreConfig() -- 2016-11-27
                scoreHist.toggleScoreConfig();
                loadingPrompt.hide('设置修改成功');
                //window.history.go(-2);
             } else {
                var scoreIndex = scoreConfig.scoreSettingCodes.indexOf(newConfig,0);
                var scoreSettingName = scoreConfig.scoreSettingNames[scoreIndex];
                loadingPrompt.hide('计分方法已经改为'+scoreSettingName);
             }
		}
	};

	webSocketObj.addListener(scoreConfigSettingListener);
	return {
		netScoreFunc: function() {
			var scoreSetting = this.getGameScoreConfig();
			eval("netScoreFuncConfig.netScoreFunc_"+ scoreSetting+".calculate")();
		},
		//invoked in ViewGame.jsp onInput() addScoreDialog.onGameScoreInput() in startGame.js -- XFZ@2017-12-27
		onGameScoreInput: function() {
		    var scoreSetting = this.getGameScoreConfig();
        	eval("netScoreFuncConfig.netScoreFunc_"+ scoreSetting+".onGameScoreInput")();
		},
		setGameScoreConfig: function(gameScoreConfig_) {
			gameScoreConfig = gameScoreConfig_;
		},
		getGameScoreConfig: function() {
			return gameScoreConfig;
		},
		changeScoreConfig: function(gameId,playerOpenId) {
			//this version of score configuration setting use "As Default" method, it is different from last version
			// where configuration is set to either player level or game level. "As Default" method set configuration
			// to either game level or game+player level.
			// see score.js 1.16 and ScoreSettingEmbeded.jsp 1.1 for old version.  XFZ@2016-12-11
			
			var newConfig = scoreConfigSelection.getValue();  //scoreConfigSelection is defined in score.js
            //moved to onSuccess() to execute
			//this.setGameScoreConfig(newConfig);
			
			var configOption = document.getElementById(scoreConfig.scoreConfigModifierTitleId);
			var configOptionValue = configOption.checked;
			var jsonString = {};
			jsonString[globalVariables.GameIdName] = gameId;
			if ( configOptionValue === true) {
				jsonString['default'] = "true";
			} 
			jsonString['openId'] = playerOpenId;
			jsonString[globalVariables.WebSocketEventTypeHandler] = configSettingEvent;
			jsonString[scoreConfigSettingHandler] = newConfig;
			webSocketObj.sendData('保存设置...',JSON.stringify(jsonString));

            this.setGameScoreConfig(newConfig);
			scorePageSetting.init();
		}
	};

}();

//CellSelection is defined in Functions.js, 
//the css class "weui-icon-success-no-circle" is defined in weui.css. same value as used in changeScoreSetting.jsp <i> tag
var scoreConfigSelection = new CellSelection("scoreSetting","weui-icon-success-no-circle"); 

//scoreConfigSettingType = "game" or "player", this function is called by  showScoreConfigModifier via button action in ViewGame.jsp 	
function setScoreConfig(scoreConfigSettingType,scoreConfigValue){
	
	var scoreConfigModifierTitle;
	//scoreConfigSettingType is not set anymore. player or game level score config is selected on ScoreSettingEmbeded.jsp page
	// and changeScoreConfig() method of this js file . -- XFZ@2016-12-11
	if ( scoreConfigSettingType === "player") {
		scoreConfigModifierTitle = "设置计分方法"; //"设置玩家的默认计分方法";
	} else {
		scoreConfigModifierTitle = "设置计分方法"; //"设置这局的计分方法";
	}
	
	var titleElement = document.getElementById(scoreConfig.scoreConfigModifierTitleId);	
	titleElement.innerHTML = scoreConfigModifierTitle;
	titleElement.name = scoreConfigSettingType;
	
	scoreConfigSelection.setValue(scoreConfigValue);		
}
var score = function () {
    var scoresMap = new Map();
    var scoreTableRowBckClr="";
    var scoreTableRowAltBckClr="";
    var winnerClr = "";
	var addScoreDialogDivId;
	var positions = globalVariables.positions;
	var positionTotal = globalVariables.positionTotal;	
	var addScoreAction;
	var refreshScoreMode;
	var tgame_id;
	var gameSerNo;
	var addScoreEventOwner = false; //set true in addScore()
	var handleScoreWebSocketResponse = {
		
		getType: function() {return globalVariables.webSocketScoreEvent;},
		onSuccess: function(jsonData) {
		    var mode = jsonData[globalVariables.MessageModeHandler];
		    if ( refreshScoreMode === mode) {
		        refreshScoreTable(jsonData);
		    } else {
                addScoreRowData(jsonData);
                if ( addScoreEventOwner === true ) {
                    clearAllScoreInputFields();
                }
            }
		},
		onError : function(jsonData,err) {
			if ( addScoreEventOwner === true ) {
			    loadingPrompt.hide();
			    showTitledMessage("请重新输入整数",err);
			    clearAllScoreInputFields();
            } else {
                showMessage(err);
            }
		}
	}
	webSocketObj.addListener(handleScoreWebSocketResponse);
	return {
	    setScore: function(pos,score) {
	        var inputId = findInputId(pos);
            var inputElement = document.getElementById(inputId);
            inputElement.value = score;
	        if ( '' === score) {
	            score = 0;
	        }
	        scoresMap.set(pos,score);
	    },
	    getScore: function(pos) {
	        return scoresMap.get(pos);
	    },
	    clearScoresMap: function() {
	        scoresMap.clear();
	    },
		setGameSerNo: function(gameSerNo_) {
			gameSerNo = gameSerNo_;
		},
		setTGameId : function(tgame_id_) {
			tgame_id = tgame_id_;
		},
		getTGameId : function () {
			return tgame_id;
		},
		setRefreshScoreMode : function(refreshScoreMode_) {
			refreshScoreMode = refreshScoreMode_;
		},
		setAddScoreAction: function(addScoreAction_) {
			addScoreAction = addScoreAction_;
		},
		setScoreTableRowAltBckClr: function(scoreTableRowAltBckClr_) {
		    scoreTableRowAltBckClr = scoreTableRowAltBckClr_;
		},
		setScoreTableRowBckClr: function(scoreTableRowBckClr_) {
            scoreTableRowBckClr = scoreTableRowBckClr_;
        },
        setWinnerClr: function(winnerClr_) {
            winnerClr = winnerClr_;
        },
		calculateNetScores: function() {
		    calculateNetScores_();
		},
		refreshScore: function() {
            var jsonObj = {};
            jsonObj[globalVariables.GameIdName] = tgame_id;
            jsonObj[globalVariables.OpenIdName] =  webSocketObj.getOpenId();
            jsonObj[globalVariables.WebSocketEventTypeHandler] = handleScoreWebSocketResponse.getType();
            jsonObj[globalVariables.MessageModeHandler] = refreshScoreMode;
            var jsonString = JSON.stringify(jsonObj)
            webSocketObj.sendData('正在刷新...',jsonString);
            clearScoresMap();
		},
		addScore: function() {
			if ( !checkScores() ) {
				return;
			}
            addScoreEventOwner = true;
		    var jsonObj = {};
		    jsonObj[globalVariables.GameIdName] = tgame_id;
            jsonObj[globalVariables.OpenIdName] =  webSocketObj.getOpenId();
            jsonObj[globalVariables.WebSocketEventTypeHandler] = handleScoreWebSocketResponse.getType();
            jsonObj["winnerPosition"] = addScoreDialog.getWinPos();
            jsonObj[globalVariables.MessageModeHandler ] = "AddScore";
            for(var i=0;i<4;i++) {
                var pos = positions[i];
                jsonObj[pos] = getPositionScore(pos);
             }
            var jsonString = JSON.stringify(jsonObj)
            webSocketObj.sendData('正在保存...',jsonString);
		}
	};
	function findInputId(pos) {
	    if ( pos === addScoreDialog.getWinPos()) {
	        return "winnerScoreField";
	    } else {
	        var playerPosition = positionConvertor.convertToPlayerName(pos);
	        for(var i=1;i<4;i++) {
	            var index = document.getElementById("loser"+i).innerHTML.indexOf(playerPosition,0);
	            if ( 0 === index ) {
	                return "loser"+i+"input";
	            }
	        }
	        return "loser1input";
	    }
	}
	function refreshScoreTable(jsonData) {
	    gameSerNo = 0;
        //clear input fields and total fields
        for (var index in positions) {
            //positionTotal is defined in startGame.jsp
            //positions is defined in js_inc.jsp
            positionTotal[index] = 0;
            clearScoreInputField(positions[index]);
        	clearScoreTotalField(positions[index]);
        	clearScoreNetField(positions[index]);
        }
        clearScoresMap();
        //delete old table data
        var rows = document.getElementById('scores').getElementsByTagName("tr");
        var rowCount = rows.length;

        //don't remove first row which is header row, don't remove second row, which is total row
        for(var i=rowCount-1;i>1;i--) {
            rows[i].remove();
        }

        var tableData = jsonData['TableDataHandler'];
        //don't add first row which is total row
        for(var i=1;i<tableData.length;i++) {
            addScoreRowData(tableData[i]);
        }
        calculateNetScores_();
	}
	function addPositionScore(index,value,isWinner) {
	 
		 var position = positions[index];
		 var total = positionTotal[index];
		 var score = value[position];
		 var sum  = parseInt(total) + parseInt(score);

		 //$('#'+position+'Total').text(sum);
		 document.getElementById(position+'Total').innerHTML=sum;
		 return sum;
	}
	function getPositionScore(position) {
//	    <!-- names of score input fields inside addScoreDialog are set in startGame.js show method -->
//		var score = getElementInsideContainerByName(addScoreDialog.addScoreDialogDivId,position+'input').value;
//		if ( score ===''){
//			score = '0';
//		}
//		return score;
        return score.getScore(position);
	}
	function clearAllScoreInputFields() {
		
		for (var index in positions) {
			clearScoreInputField(positions[index]);
		}
		score.clearScoresMap();
	}
	function clearScoreInputField(position) {
		getElementInsideContainer(addScoreDialog.addScoreDialogDivId,'winnerScore').value = '';
		getElementInsideContainer(addScoreDialog.addScoreDialogDivId,'loser1input').value = '';
		getElementInsideContainer(addScoreDialog.addScoreDialogDivId,'loser2input').value = '';
		getElementInsideContainer(addScoreDialog.addScoreDialogDivId,'loser3input').value = '';
	}
	function clearScoreTotalField(position) {
		//$('#'+position+'Total').html('0');
		document.getElementById(position+'Total').innerHTML='0';
		
	}
	function clearScoreNetField(position) {
		//$('#'+position+'TotalNet').html('0');
		//TotalNet column is removed -- 2017-01-16
		//document.getElementById(position+"TotalNet").innerHTML='0';
	}
	function checkScores() {
		//check if all postion are 0
		var nonNullCount=0;
		for (var index in positions) {
		  if ( getPositionScore(positions[index]) != 0 ) { 
			nonNullCount = nonNullCount +1;
		  }
		}
		
		if ( nonNullCount == 0) {
			showMessage('请输入赢方得分');
			return false;
		}
		//检查输分总和是否等于赢分
		var sumOfLoser=0;
		for(var i=0;i<4;i++) {
		    if ( positions[i]===addScoreDialog.getWinPos()){
		        continue;
		    }
		    sumOfLoser = parseInt(sumOfLoser) + parseInt(getPositionScore(positions[i]));
		}
		var winnerScore = getPositionScore(addScoreDialog.getWinPos());
		if ( sumOfLoser !== winnerScore) {
		    showTitledMessage('错误！','输分总和不等于赢分。');
		    return false;
		} else {
		    return true;
		}
	}
	/**
	     * 在积分历史表添加一行积分
	     * value is jsonobject returned from server by converting tscore to json
         * called by handleScoreWebSocketResponse
        */
	function addScoreRowData(value) {
		var bckClr;
		if ( gameSerNo%2 === 0) {
		    bckClr = scoreTableRowBckClr;
		} else {
		    bckClr = scoreTableRowAltBckClr;
		}
		gameSerNo = gameSerNo +1;
		var newRow = document.createElement('tr');
		newRow.id = value['tscore_id'];
		newRow.className = 'dataRow';
		var tdRowHeader = document.createElement('td');
        tdRowHeader.className = 'ScoreRowHeader';
        tdRowHeader.innerHTML = gameSerNo;
        tdRowHeader.style.backgroundColor = bckClr;
        var cellEast = document.createElement('td');
        cellEast.innerHTML = value[positions[0]];
        cellEast.className='ScorePosition1';
        cellEast.style.backgroundColor = bckClr;
        styleScoreCell(cellEast,value[positions[0]]);
        var cellSouth = document.createElement('td');
        cellSouth.innerHTML = value[positions[1]];
        cellSouth.className='ScorePosition2';
        cellSouth.style.backgroundColor = bckClr;
        styleScoreCell(cellSouth,value[positions[1]]);
        var cellWest = document.createElement('td');
        cellWest.innerHTML = value[positions[2]];
        cellWest.className='ScorePosition1';
        cellWest.style.backgroundColor = bckClr;
        styleScoreCell(cellWest,value[positions[2]]);
        var cellNorth = document.createElement('td');
        cellNorth.innerHTML = value[positions[3]];
        cellNorth.className='ScorePosition2';
        cellNorth.style.backgroundColor = bckClr;
        styleScoreCell(cellNorth,value[positions[3]]);
		newRow.appendChild(tdRowHeader);
		newRow.appendChild(cellEast);
		newRow.appendChild(cellSouth);
		newRow.appendChild(cellWest);
		newRow.appendChild(cellNorth);

		var tbody = document.getElementById('scores').getElementsByTagName('tbody');
		tbody[0].appendChild(newRow);
			
		//calculate total score for each position
		for (var index in positions) {
			positionTotal[index] = addPositionScore(index,value );
			document.getElementById(positions[index]+"PlayerNameTotal").innerHTML = positionTotal[index];
		}
			
		//calculate net scores for each positiond
		calculateNetScores_();
	}
	function styleScoreCell(cell,score) {
	    if ( score > 0) {
	        cell.style.backgroundColor = winnerClr;
	    }
	}
	//计算净得分
	function calculateNetScores_() {
		scoreConfig.netScoreFunc();
	}
	
}();
var scorePageSetting = function() {
    function remove(id) {
        var ele = document.getElementById(id);
        if ( null != ele) {
            ele.remove();
        }
    }
    return {
        init:function() {
            var config_ = scoreConfig.getGameScoreConfig();
            var scoreMethod_ = eval("netScoreFuncConfig.netScoreFunc_"+ config_+".getScoreMethod")();
            if ( 0 == scoreMethod_ ) {
                //自摸和胡的算分模式是一样的，‘自摸’和‘胡了’两个按钮合并成‘自摸/胡了’一个按钮 -- XFZ@2017-12-17
                document.getElementById('eastWin0').style.visibility = 'hidden';
                document.getElementById('southWin0').style.visibility = 'hidden';
                document.getElementById('westWin0').style.visibility = 'hidden';
                document.getElementById('northWin0').style.visibility = 'hidden';
                document.getElementById('eastWin0').innerHTML = '';
                document.getElementById('southWin0').innerHTML = '';
                document.getElementById('westWin0').innerHTML = '';
                document.getElementById('northWin0').innerHTML = '';
//                remove('eastWin0');
//                remove('southWin0');
//                remove('westWin0');
//                remove('northWin0');
                document.getElementById('eastWin1').innerHTML = '胡了/自摸';
                document.getElementById('southWin1').innerHTML = '胡了/自摸';
                document.getElementById('westWin1').innerHTML = '胡了/自摸';
                document.getElementById('northWin1').innerHTML = '胡了/自摸';
            } else {
                 document.getElementById('eastWin0').style.visibility = 'visible';
                 document.getElementById('southWin0').style.visibility = 'visible';
                 document.getElementById('westWin0').style.visibility = 'visible';
                 document.getElementById('northWin0').style.visibility = 'visible';
                 document.getElementById('eastWin0').innerHTML = '胡了';
                 document.getElementById('southWin0').innerHTML = '胡了';
                 document.getElementById('westWin0').innerHTML = '胡了';
                 document.getElementById('northWin0').innerHTML = '胡了';
                 document.getElementById('eastWin1').innerHTML = '自摸';
                 document.getElementById('southWin1').innerHTML = '自摸';
                 document.getElementById('westWin1').innerHTML = '自摸';
                 document.getElementById('northWin1').innerHTML = '自摸';
            }
        }
    }
}();