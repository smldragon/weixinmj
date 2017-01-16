<%@ page language="java" contentType="text/html; charset=utf-8"  %>
<%@ include file="import_inc.jsp" %>

<%
//System.out.println("+++++++++++++++Here is startGame.jsp+++++++++++++++++++++++++");
		//WebUtils.debugHttpRequest(request);
		String code = request.getParameter("code");
		StartGame sg = new StartGame();
		if  ( code != null) {
			sg.setOpenIdAccessCode(code);
		} 
		String gameIdStr = request.getParameter(WxMjConstants.GameIdName);
		if ( gameIdStr != null) {
			sg.setTgameId(Integer.parseInt(gameIdStr));
		}
		String openId = request.getParameter(WeiXinConstants.OpenIdName);
		if ( openId != null) {
			sg.setOpenId(openId);
		} else {
		    openId = sg.getOpenId();
		}
		ViewGame view = sg.getViewGame();
		if ( view == null) {
			out.print("<!doctype html><html><body><h1><center>找不到指定的牌局</center></h1></body></html>");
			return;
		}
		int [] positionTotal = view.getPositionTotal();
		int gameId = view.getGameId();
		boolean isHost = view.getHostOpenId().equals(openId);

		String [] scoreSettingCodes = ViewGame.getScoreSettingCodes();
		String [] scoreSettingNames = ViewGame.getScoreSettingNames();
%>
<%@ include file="GlobalVariables.jsp" %>
<script>
	//webSocketObj.setOpenId('<%=sg.getOpenId()%>'); has to be executed before <html>
	webSocketObj.setOpenId('<%=sg.getOpenId()%>');
	globalVariables.positionTotal[0] = <%=positionTotal[0]%>;
	globalVariables.positionTotal[1] = <%=positionTotal[1]%>;
	globalVariables.positionTotal[2] = <%=positionTotal[2]%>;
	globalVariables.positionTotal[3] = <%=positionTotal[3]%>;
	score.setGameSerNo(<%=view.getScoreLength()%>);
	score.setTGameId(<%=gameId%>);
	gameAction.hostNickName = "<%=view.getHostNickName()%>";
	gameAction.startTime = "<%=view.getStartTime()%>";
	gameAction.endTime = "<%=view.getEndTime()%>";
    gameAction.setIsHost(<%=isHost%>);
	gameAction.setGameId('<%=gameId%>');
	gameAction.setStartGame(true);
	gameAction.setTempPlayerPrefix('<%=WxMjConstants.TempPlayerPrefix%>');
	gameAction.setChangeGameAction('<%=WxMjConstants.ChangeGameAction%>');
    gameAction.setExitGameMode('<%=WxMjConstants.ExitGameMode%>');
    gameAction.setJoinGameMode('<%=WxMjConstants.JoinGameMode%>');
    gameAction.setRequestGameMode('<%=WxMjConstants.RequestMode%>');
    gameAction.setApproveMode('<%=WxMjConstants.ApproveMode%>');
    positionConvertor.blankPlayerName = "<%=view.getBlankPlayerName()%>";
	score.setRefreshScoreMode('<%=WxMjActions.refreshScores%>');
	score.setAddScoreAction('<%=WxMjActions.addScores%>');
	scoreConfig.setGameScoreConfig('<%=view.getScoreSetting()%>');

	scoreConfig.scoreSettingCodes = [];
	scoreConfig.scoreSettingNames = [];
	<% for (int i=0;i<scoreSettingCodes.length;i++) { %>
	    var index = <%=i%>;
	    scoreConfig.scoreSettingCodes[index]='<%=scoreSettingCodes[i]%>';
    	scoreConfig.scoreSettingNames[index] ='<%=scoreSettingNames[i]%>';
    <% } %>
	//scoreConfig.setPlayerScoreConfig('<%=sg.getPlayerDefaultScoreSetting()%>');
</script>
<!doctype html>
<html>
	<head>
		<meta http-equiv="pragma" content="no-cache">
		<%@ include file="meta_style_inc.jsp" %>
		<script src="js/startGame.js"></script>
		<link rel="stylesheet" type="text/css" href="css/WeUI-1-1-0/weui.min.css">
	    <link rel="stylesheet" type="text/css" href="css/wxmj.css">
		
		<link rel="stylesheet" type="text/css" href="css/startGameLayout.css">
		
		<title><%=WxMjConstants.AppTitle%></title>
		
	</head>

	<body class="no-js">
		
		<div id='scoreHistDiv'  style='display:none'>
			<!-- 下面这个div是得分历史，正常情形下隐藏不可见得，由javascript控制它得可见性-->
			<%@ include file="ViewJiFeng.jsp" %>
		</div>
		<div id='scoreSummaryDiv' >
			<%@ include file="threeLine.jsp" %>
			<%@ include file="ViewGame.jsp" %>
		</div>
		<div id='scoreConfigSettingDiv' style='display:none' >
			<%@ include file="ScoreSettingEmbeded.jsp" %>
		</div>
	</body>
</html>
