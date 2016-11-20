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

<H3>
	<center><%=header%></center>
</H3>
	<!-- div>
		<select name="scoreSetting" id="scoreSetting" class='weui-select' tabindex="1000">
			<option value="FZ"  >福州</option>
			<option value="NJ"  >南京</option>
			<option value="SH"  >上海</option>
		</select>
			
		<button  class="weui-btn_mini weui-btn_plain-primary" onClick="scoreConfig.changeScoreConfig(this,'<%=gameIdStr%>')">提交</button>
	</div -->
	
<div id="scoreSetting" class="weui-cells weui-cell_access">
    <a id="FZ" class="weui-cell" href="#" onClick="scoreConfig.changeScoreConfig(this,'<%=gameIdStr%>')">
        <div class="weui-cell__bd weui_cell_primary">
            <p>福州</p>
        </div>
        <!-- div class="weui_cell__ft">
            说明文字
        </div -->
		 <div  class="weui-cell__hd"  >
			<i class="weui-icon-success-no-circle" style="display:none"></i>
        </div>
    </a>
	<a id="NJ" class="weui-cell" href="#" onClick="scoreConfig.changeScoreConfig(this,'<%=gameIdStr%>')">
        <div class="weui-cell__bd weui_cell_primary">
            <p>南京</p>
        </div>
		 <div class="weui-cell__hd" >
			<i class="weui-icon-success-no-circle" style="display:none" ></i>
        </div>
    </a>
    <a id="SH" class="weui-cell" href="#" onClick="scoreConfig.changeScoreConfig(this,'<%=gameIdStr%>')">
        <div class="weui-cell__bd weui_cell_primary">
            <p>上海</p>
        </div>
		 <div class="weui-cell__hd"  >
			<i class="weui-icon-success-no-circle" style="display:none"></i>
        </div>
    </a>
</div>