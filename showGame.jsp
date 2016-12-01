<%@ page language="java" contentType="text/html; charset=utf-8"  %>
<%@ include file="import_inc.jsp" %>

<%
//System.out.println("+++++++++++++++Here is showGame.jsp+++++++++++++++++++++++++");
		//WebUtils.debugHttpRequest(request);
		String code = request.getParameter("code");
		System.out.println("code="+code);
		ViewGame view = new StartGame(code).getViewGame();
		if ( view == null) {
			out.print("<!doctype html><html><body><center><h1>找不到指定的牌局</h1></center></body></html>");
			return;
		}
		String headIconWidth="70";
		
		int [] positionTotal = view.getPositionTotal();
%>

<script>

	openId = '<%=code%>';
	var addScoreAction = '<%=WxMjActions.addScores%>';
	var refreshScoreAction = '<%=WxMjActions.refreshScores%>';
	var tgame_id = '<%=view.getGameId()%>';
	var gameSerNo = <%=view.getScoreLength()%>;
	positionTotal = ['<%=positionTotal[0]%>','<%=positionTotal[1]%>','<%=positionTotal[2]%>','<%=positionTotal[3]%>'];
</script>
<!doctype html>
<html>
	<head>
		<%@ include file="GlobalVariables.jsp" %>
		<%@ include file="meta_style_inc.jsp" %>
		<script src="js/startGame.js"></script>
		<link rel="stylesheet" type="text/css" href="css/WeUI-1-1-0/weui.min.css">
	    <link rel="stylesheet" type="text/css" href="css/wxmj.css">
		
		<link rel="stylesheet" type="text/css" href="css/startGameLayout.css">
		<title><%=WxMjConstants.AppTitle%></title>
		
		
	</head>

	<body>

		<%@ include file="ViewGame.jsp" %>
	</body>
</html>
