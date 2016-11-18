<%
	String header;
	if ( gameIdStr == null) {
		header = "修改玩家的默认计分设置";
	} else {
		header = "修改这局的计分设置";
	}
		
	String setScoreConfigSetting = sg.getPlayerDefaultScoreSetting();
%>
<script src="js/changeScoreSetting.js" ></script>
<script>
	//webSocketObj.setOpenId('<%=sg.getOpenId()%>'); has to be executed before <html>
	webSocketObj.setOpenId('<%=sg.getOpenId()%>');
	playerSetting.setScoreConfigSetting('<%=setScoreConfigSetting%>');
</script>

	<div>
		<center><%=header%></center>
	</div>
	<div>
		<select name="scoreSetting" id="scoreSetting" class='weui-select' tabindex="1000">
			<option value="FZ"  >福州</option>
			<option value="NJ"  >南京</option>
			<option value="SH"  >上海</option>
		</select>
			
		<button  class="weui-btn_mini weui-btn_plain-primary" onClick="scoreConfig.changeScoreConfig('<%=gameIdStr%>')">提交</button>
	</div>
	
	