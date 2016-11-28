<%@ page language="java" contentType="text/html; charset=utf-8"  %>
<%@ include file="import_inc.jsp" %>

<%
	//This file is able to modify score configaration for both player and game level, see scoreConfig -- XFZ@2016-11-27
	final String scoreConfigModifierTitle = "scoreConfigModifierTitle";
	
	//WebUtils.debugHttpRequest(request);
	String code = request.getParameter("code");
	StartGame sg = new StartGame();
	if  ( code != null) {
		sg.setOpenIdAccessCode(code);
	} 
		
	String gameIdStr = request.getParameter("gameId");
	if ( gameIdStr != null) {
		sg.setTgameId(Integer.parseInt(gameIdStr));
	} 
	String openId = request.getParameter(WeiXinConstants.OpenIdName);
	if ( openId != null) {
		sg.setOpenId(openId);
	}
			
		
	
	ViewGame view = sg.getViewGame();
	if ( view == null) {
		out.print("<!doctype html><html><body><h1><center>找不到指定的牌局</center></h1></body></html>");
		return;
	}
		
	int gameId = view.getGameId();

%>
<%@ include file="GlobalVariables.jsp" %>
<script>
	//webSocketObj.setOpenId('<%=sg.getOpenId()%>'); has to be executed before <html>
	webSocketObj.setOpenId('<%=sg.getOpenId()%>');
	scoreConfig.scoreConfigModifierTitleId = "<%=scoreConfigModifierTitle%>";
	scoreConfig.setGameScoreConfig('<%=view.getScoreSetting()%>');
	scoreConfig.setPlayerScoreConfig('<%=sg.getPlayerDefaultScoreSetting()%>');
</script>
<!doctype html>
<html>
<head>
		<%@ include file="meta_style_inc.jsp" %>
		<script src="js/changeScoreSetting.js" ></script>
		<link rel="stylesheet" type="text/css" href="css/WeUI-1-1-0/weui.min.css">
	    <link rel="stylesheet" type="text/css" href="css/wxmj.css">
		<link rel="stylesheet" type="text/css" href="css/wxmj_layout.css">
		<link rel="stylesheet" type="text/css" href="css/startGameLayout.css">
		<link rel="stylesheet" type="text/css" href="css/startGameLayout2.css">
		<title><%=WxMjConstants.AppTitle%></title>
</head>

<body>

	<H3 id="<%=scoreConfigModifierTitle%>" style="text-align: center" >

	</H3>
	
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
				<!-- when changeScoresetting.jsp is a div of startGame.jsp, use scoreHist.toggleSecoreConfig() -- 2016-11-27
				<a href="#" onClick="scoreHist.toggleScoreConfig()" class="weui-btn weui-btn_plain-primary" style="height:80%; width:95%;">取消</a>
				-->
			
				<a href="#" onClick="window.history.back();" class="weui-btn weui-btn_plain-primary" style="height:80%; width:95%;">取消</a>
			</div>
		</div>
	</div>
</body>
</html>