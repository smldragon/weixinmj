<%@ page language="java" contentType="text/html; charset=utf-8"  %>
<%@ include file="import_inc.jsp" %>

<%
	//This file is able to modify score configaration for both player and game level, see scoreConfig -- XFZ@2016-11-27
	
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
		
		<link rel="stylesheet" type="text/css" href="css/startGameLayout.css">
	
		<title><%=WxMjConstants.AppTitle%></title>
</head>

<body>

	<%@ include file="ScoreSettingEmbeded.jsp" %>
</body>
</html>