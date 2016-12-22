<%@ page language="java" contentType="text/html; charset=utf-8"  %>
<%@ include file="import_inc.jsp" %>

<%
//this file is no longer need anymore -- XFZ@2016-09-08
//System.out.println("+++++++++++++++Here is joinGame.jsp+++++++++++++++++++++++++");
		//WebUtils.debugHttpRequest(request);
		String openId = request.getParameter(WeiXinConstants.OpenIdName);
		String gameId = request.getParameter("tgameId");
		String position = request.getParameter("position");
		ViewGame view = new JoinGame(gameId,openId,position).getViewGame();
		if ( view.getErrMsg() != null ) {
			out.print("<html><body><H1 align='center'>"+view.getErrMsg()+"</H1></body></html>");
			return;
		}
%>

<!doctype html>
<html>
	<head>
		<%@ include file="GlobalVariables.jsp" %>
		<%@ include file="meta_style_inc.jsp" %>
		
		<link rel="stylesheet" type="text/css" href="css/wxmj.css">
		<link rel="stylesheet" type="text/css" href="css/wxmj_layout.css">
		<script>
			openId = '<%=openId%>';      //declared in js_inc.jsp
			gameId = '<%=gameId%>';      //declared in js_inc.jsp
			var position = '<%=position%>';
		</script>
		
		
		<script src="js/joinGame.js"></script>
		
		<title><%=WxMjConstants.AppTitle%></title>
		
	</head>

	<body>
		<%@ include file="ViewGame.jsp" %>
	</body>
</html>
