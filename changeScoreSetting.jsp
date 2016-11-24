<script src="js/changeScoreSetting.js" ></script>

<%
	String scoreConfigModifierTitle = "scoreConfigModifierTitle";
%>
<script>
	//webSocketObj.setOpenId('<%=sg.getOpenId()%>'); has to be executed before <html>
	webSocketObj.setOpenId('<%=sg.getOpenId()%>');
	scoreConfig.scoreConfigModifierTitleId = "<%=scoreConfigModifierTitle%>";
</script>

<H3 id="<%=scoreConfigModifierTitle%>" style="text-align: center" >

</H3>
	<!-- div>
		<select name="scoreSetting" id="scoreSetting" class='weui-select' tabindex="1000">
			<option value="FZ"  >福州算法</option>
			<option value="NJ"  >南京算法</option>
			<option value="SH"  >上海算法</option>
		</select>
			
		<button  class="weui-btn_mini weui-btn_plain-primary" onClick="scoreConfig.changeScoreConfig(this,'<%=gameIdStr%>')">提交</button>
	</div -->
	
<div id="scoreSetting" class="weui-cells weui-cell_access">
    <a id="FZ" class="weui-cell" href="#" onClick="scoreConfigSelection.setValueByElementId(this)">    
        <div class="weui-cell__bd weui_cell_primary">
            <p>福州算法</p>
        </div>
        <!-- div class="weui_cell__ft">
            说明文字
        </div -->
		 <div  class="weui-cell__hd"  >
			<i class="weui-icon-success-no-circle" style="display:none"></i>
        </div>
    </a>
	<a id="NJ" class="weui-cell" href="#" onClick="scoreConfigSelection.setValueByElementId(this)">
        <div class="weui-cell__bd weui_cell_primary">
            <p>南京算法</p>
        </div>
		 <div class="weui-cell__hd" >
			<i class="weui-icon-success-no-circle" style="display:none" ></i>
        </div>
    </a>
    <a id="SH" class="weui-cell" href="#" onClick="scoreConfigSelection.setValueByElementId(this)">
        <div class="weui-cell__bd weui_cell_primary">
            <p>上海算法</p>
        </div>
		 <div class="weui-cell__hd"  >
			<i class="weui-icon-success-no-circle" style="display:none"></i>
        </div>
    </a>
</div>
<div class="weui-msg_ZhuXiao" style="height:24%; width:100%;">
    <div class="divbtn1"   >
		<div style="height:50%; width:50%; float:left;">
			<a href="#" onClick="scoreConfig.changeScoreConfig('<%=gameIdStr%>','<%=sg.getOpenId()%>')" class="weui-btn weui-btn_plain-primary" style="height:80%; width:95%;">保存设置</a>
		</div>
		<div style="height:50%; width:50%; float:left;">
			<a href="#" onClick="scoreHist.toggleScoreConfig()" class="weui-btn weui-btn_plain-primary" style="height:80%; width:95%;">取消</a>
		</div>
    </div>
</div>