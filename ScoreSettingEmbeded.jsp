<%@ page language="java" contentType="text/html; charset=utf-8"  %>
<%
	//This file is able to modify score configaration for both player and game level, see scoreConfig -- XFZ@2016-11-27
	final String scoreConfigModifierTitle = "scoreConfigModifierTitle";

%>
<script>
	//this version of score configuration setting use "设置为默认" check box, it is different from last version
	// where configuration is set to either player level or game level. "设置为默认" method set configuration
	// to either game level or game+player level.
	// see score.js 1.16 and ScoreSettingEmbeded.jsp 1.1 for old version.  XFZ@2016-12-11
			
	scoreConfig.scoreConfigModifierTitleId = "<%=scoreConfigModifierTitle%>";
</script>
<!-- H3 id="<%=scoreConfigModifierTitle%>" style="text-align: center" >

</H3 -->
	
<div id="scoreSetting" class="weui-cells weui-cell_access">
    <% for(int i=0;i<scoreSettingCodes.length;i++) { %>
        <a id="<%=scoreSettingCodes[i]%>" class="weui-cell" href="#" onClick="scoreConfigSelection.setValueByElementId(this)">
        	<div class="weui-cell__bd weui_cell_primary">
        		<p><%=scoreSettingNames[i]%></p>
        	</div>
        	<!-- div class="weui_cell__ft">
        		说明文字
        	</div -->
        	<div  class="weui-cell__hd"  >
        	    <!-- display is set in function CellSelection in Function.js -->
        		<i class="weui-icon-success-no-circle" style="display:none"></i>
        	</div>
        </a>

    <% } %>
</div>
<div>
	<H4><center><input type="checkbox" id="<%=scoreConfigModifierTitle%>" value="default" checked="checked"> 设置为默认 <br></center></H4>
</div>
<div class="weui-msg_ZhuXiao" style="height:24%; width:100%;">
	<div class="divbtn1"   >
		<div style="height:50%; width:50%; float:left;">
			<a href="#" onClick="scoreConfig.changeScoreConfig('<%=gameId%>','<%=sg.getOpenId()%>')" class="weui-btn weui-btn_plain-primary" style="height:80%; width:95%;">保存设置</a>
		</div>
		<div style="height:50%; width:50%; float:left;">
			<!-- when changeScoresetting.jsp is a div of startGame.jsp, use scoreHist.toggleSecoreConfig() -- 2016-11-27 -->
			<a href="#" onClick="scoreHist.toggleScoreConfig()" class="weui-btn weui-btn_plain-primary" style="height:80%; width:95%;">取消</a>	
			<!-- a href="#" onClick="window.history.back();" class="weui-btn weui-btn_plain-primary" style="height:80%; width:95%;">取消</a -->
		</div>
	</div>
</div>