var scoreConfig = function () {
	
	//scoreConfigSetting is defined in startGame.jsp
	var scoreConfig; 
	var positions = globalVariables.positions;
	var positionTotal = globalVariables.positionTotal;
	var positionNet = globalVariables.positionNet;
	var configSettingEvent = globalVariables.webSocketScoreConfigSettingEvent;
	var scoreConfigSettingHandler = globalVariables.scoreConfigSettingHandler;
	
	var scoreConfigSettingListener = {
		
		getType: function(){ return configSettingEvent;},
		onError: function(jsonData,err) {
			alert(err);
		},
		onSuccess: function(jsonData) {
			var newConfig = jsonData[scoreConfigSettingHandler];
			alert('设置修改成功, newConfig='+newConfig);
		}
	};
	
	webSocketObj.addListener(scoreConfigSettingListener);
	return {
		netScoreFunc: function() {
			//$("netScoreFunc_"+scoreConfig);
			eval("netScoreFunc_"+scoreConfig)();
		},
		setScoreConfig: function(scoreConfig_) {
			scoreConfig = scoreConfig_;
		},
		changeScoreConfig: function(gameId) {
			var scoreSettingOptions = document.getElementById("scoreSetting");
			var newConfig = scoreSettingOptions.options[scoreSettingOptions.selectedIndex].value;
			var jsonString = {'gameId':gameId};
			jsonString[globalVariables.WebSocketEventTypeHandler] = configSettingEvent;
			jsonString[scoreConfigSettingHandler] = newConfig;
			webSocketObj.sendData(JSON.stringify(jsonString));
		}
	}
	function netScoreFunc_FZ () {
		var totalOf4 = 0;
		$.each(positionTotal, function(index,value) {
			totalOf4 = totalOf4 + parseInt(value);
		});
		
		//net score = (4*postionScore) - totalOf4
		
		for(index=0;index<4;index++) {
			positionNet[index] = 4*positionTotal[index] - totalOf4;
			$('#'+positions[index]+'TotalNet').text(positionNet[index]);
		}
		
	}
	function netScoreFunc_SH () {
		var totalOf4 = 0;
		$.each(positionTotal, function(index,value) {
			totalOf4 = totalOf4 + parseInt(value);
		});
		
		//net score = (4*postionScore) - totalOf4
		
		for(index=0;index<4;index++) {
			positionNet[index] = 4*positionTotal[index] - totalOf4;
			$('#'+positions[index]+'TotalNet').text(positionNet[index]);
		}
		
	}
}();

var score = function () {
	
	var positions = globalVariables.positions;
	var positionTotal = globalVariables.positionTotal;	
	var addScoreAction;
	var refreshScoreAction;
	var tgame_id;
	var gameSerNo;
	var handleScoreWebSocketResponse = {
		
		getType: function() {return globalVariables.webSocketScoreEvent;},
		onSuccess: function(jsonData) {
			addScoreRowData(jsonData);
		},
		onError : function(jsonData,err) {
			alert(err);
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
		calculateNetScores: function() {calculateNetScores_;},
		refreshScore: function() {
			$.ajax({
				url: mjServerUrl+refreshScoreAction+'&tgame_id='+tgame_id,
				type: "GET",
				async: true, 
				dataType: 'json',
				error:function(data,status,er) {
					alert("error: "+data+" status: "+status+" er:"+er);
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
	
			var dataStr = "{"+getPosScoreJsonStr(positions[0])+","+getPosScoreJsonStr(positions[1])+","+getPosScoreJsonStr(positions[2])+","+getPosScoreJsonStr(positions[3])+",tgame_id:"+tgame_id+"}";
		
			$.ajax({
		
				url: globalVariables.mjServerUrl+addScoreAction,
				type: "POST",
				async: true, 
				data: dataStr,
				dataType: 'json',
				error:function(data,status,er) {
					alert("分数格式错误。请重新输入整数");
					clearAllScoreInputFields();
				},
				success: function(data, textStatus, jqXHR){
       
					clearAllScoreInputFields();
					//其他的UI更新是通过server call back由handleScoreWebSocketResponse实现 -- XFZ@2016-09-29
				}
			});
		}
	};
	function addPositionScore(index,value) {
	 
		 var position = positions[index];
		 var total = positionTotal[index];
		 var score = value[position];
		 var sum  = parseInt(total) + parseInt(score);
		 $('#'+position+'Total').text(sum);
		 return sum;
	}
	function getPosScoreJsonStr(position) {
		 
		 var score = getPositionScore(position);
		 var jsonStr  = position+":"+getPositionScore(position);
		 return jsonStr;
	}
	function getPositionScore(position) {
		
		var score = $('#'+position+'Score').val();
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
		$('#'+position+'Score').val('');
		
	}
	function clearScoreTotalField(position) {
		$('#'+position+'Total').html('0');
		
	}
	function clearScoreNetField(position) {
		$('#'+position+'TotalNet').html('0');
		
	}
	function checkScores() {
		
		//check input format for each position
		for (var index in positions) {
		  if ( ! validateScore(positions[index])) { 
			return false;
		  }
		}
		
		//check if all postion are 0
		var nonNullCount=0;
		for (var index in positions) {
		  if ( getPositionScore(positions[index]) != 0 ) { 
			nonNullCount = nonNullCount +1;
		  }
		}
		
		if ( nonNullCount == 0) {
			alert('请输入至少一个分数');
			return false;
		} else {
			return true;
		}
	}
	function validateScore(position) {
		var score = getPositionScore(position);
		if ( ! $.isNumeric(score) ) {
			alert(getPositiondDisplay(position)+'的分数无效');
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






