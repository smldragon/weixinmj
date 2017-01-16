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
			//$("netScoreFunc_"+gameScoreConfig);
			var scoreSetting = this.getGameScoreConfig();
			eval("netScoreFunc_"+ scoreSetting)();
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
			webSocketObj.sendData(JSON.stringify(jsonString));
			loadingPrompt.show('保存设置...');
		}
	}
	function netScoreFunc_FZ () {
		var totalOf4 = 0;
		for(var index = 0;index<4;index++) {
			var pt = positionTotal[index];
            totalOf4 = totalOf4 + parseInt(pt);
		};

		//by new score recording, positionTotal = positionNet -- 2017-01-14, see ViewGrame.jsp
        //for(index=0;index<4;index++) {
			//positionNet[index] = 4*positionTotal[index] - totalOf4;
			//document.getElementById(positions[index]+'TotalNet').innerHTML = positionNet[index];
		//}
		
	}
	function netScoreFunc_SH () {
		netScoreFunc_FZ();
	}
	function netScoreFunc_NJ () {
	    netScoreFunc_FZ();
    }
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
	var addScoreDialogDivId;
	var positions = globalVariables.positions;
	var positionTotal = globalVariables.positionTotal;	
	var addScoreAction;
	var refreshScoreAction;
	var tgame_id;
	var gameSerNo;
	var addScoreEventOwner = false; //set true in addScore()
	var handleScoreWebSocketResponse = {
		
		getType: function() {return globalVariables.webSocketScoreEvent;},
		onSuccess: function(jsonData) {
			addScoreRowData(jsonData);
			if ( addScoreEventOwner === true ) {
			    clearAllScoreInputFields();
			    loadingPrompt.hide();
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
		setGameSerNo: function(gameSerNo_) {
			gameSerNo = gameSerNo_;
		},
		setTGameId : function(tgame_id_) {
			tgame_id = tgame_id_;
		},
		getTGameId : function () {
			return tgame_id;
		},
		setRefreshScoreAction : function(refreshScoreAction_) {
			refreshScoreAction = refreshScoreAction_;
		},
		setAddScoreAction: function(addScoreAction_) {
			addScoreAction = addScoreAction_;
		},
		calculateNetScores: function() {
		    calculateNetScores_();
		},
		refreshScore: function() {
			$.ajax({
				url: mjServerUrl+refreshScoreAction+'&tgame_id='+tgame_id,
				type: "GET",
				async: true, 
				dataType: 'json',
				error:function(data,status,er) {
					showMessage("error: "+data+" status: "+status+" er:"+er);
				},
				success: function(tableData, textStatus, jqXHR){
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
					
					//delete old table data
					var rows = $('#scores').find("tr");
					var rowCount = rows.length;
					
					
					
					$("#scores tr.dataRow").each(function() {
						$(this).remove();
					}); 
					
					$.each(tableData, function (index, value) {
						
						if ( index===0) {
							/**
							 * skip first row which is total row, total is moved to addScoreRowData() to be calculated. -- XFZ@2016-09-07
							 */
							//first row is total row
							//$.each(positions, function (posIndex, pos)  {
							//	positionTotal[posIndex] = value[positions[posIndex]];
							//	$('#'+pos+'Total').text(positionTotal[posIndex] );
								
							//})
							
						} else {
							addScoreRowData(value);
						}	
					});
					
					calculateNetScores_();
				}
			});
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
            webSocketObj.sendData(jsonString);
            loadingPrompt.show('正在保存...');
		}
	};
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
	    <!-- names of score input fields inside addScoreDialog are set in startGame.js show method -->
		var score = getElementInsideContainerByName(addScoreDialog.addScoreDialogDivId,position+'input').value;
		var text = getElementInsideContainerByName(addScoreDialog.addScoreDialogDivId,position+'input').innerHTML;
		if ( score ===''){
			score = '0';
		}
		return score;
	}
	function clearAllScoreInputFields() {
		
		for (var index in positions) {
			clearScoreInputField(positions[index]);
		}
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
		document.getElementById(position+"TotalNet").innerHTML='0';
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
		var winnerScore = parseInt(getPositionScore(addScoreDialog.getWinPos()));
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
			
		gameSerNo = gameSerNo +1;
		var row = "<tr id='"+value['tscoreId']+"' class='dataRow'>"+
			"<td class='ScoreRowHeader'>"+ gameSerNo +"</td>"+
			"<td class='ScorePosition1' >"+ value[positions[0]] +"</td>"+
			"<td class='ScorePosition2' >"+ value[positions[1]] +"</td>"+
			"<td class='ScorePosition1'  >"+ value[positions[2]] +"</td>"+
			"<td class='ScorePosition2' >"+ value[positions[3]] +"</td>"+
			"</tr>";
				
		$('#scores tbody').append(row);
			
		//calculate total score for each position
		for (var index in positions) {
			positionTotal[index] = addPositionScore(index,value );	
		}
			
		//calculate net scores for each positiond
		calculateNetScores_();
	}
	//计算净得分
	function calculateNetScores_() {
		scoreConfig.netScoreFunc();
	}
	
}();


