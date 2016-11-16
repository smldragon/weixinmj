<%@ page language="java" contentType="text/html; charset=utf-8"  %>
<%@ include file="import_inc.jsp" %>

<%
//System.out.println("+++++++++++++++Here is searchGame.jsp+++++++++++++++++++++++++");
		//WebUtils.debugHttpRequest(request);
		String code = request.getParameter("code");
		SearchGame sg = new SearchGame();
		if  ( code != null) {
			sg.setOpenIdAccessCode(code);
		} 
		String openId = request.getParameter(WeiXinConstants.OpenIdName);
		if ( openId != null) {
			sg.setOpenId(openId);
		}
		
		String joinGameUrl = "http://"+WxMjConstants.WxMjHost+"/"+WxMjConstants.WxMjRelativePath+"/"+WxMjConstants.JoinGamePage;
		
%>
<%@ include file="GlobalVariables.jsp" %>
<script>
	//webSocketObj.setOpenId('<%=sg.getOpenId()%>'); has to be executed before <html>
	webSocketObj.setOpenId('<%=sg.getOpenId()%>');
</script>
<!doctype html>
<html>
	<head>
		
		<%@ include file="meta_style_inc.jsp" %>
		<link rel="stylesheet" type="text/css" href="css/weui.min.css">
	    <link rel="stylesheet" type="text/css" href="css/wxmj.css">
		<link rel="stylesheet" type="text/css" href="css/wxmj_layout.css">
		<script src="js/searchGame.js"></script>
		
		<title><%=WxMjConstants.AppTitle%></title>
		
	</head>

	<body>
		<%
			if ( sg.size() == 0) {
				out.print("<!doctype html><html><body><h1><center>暂无牌局</center></h1></body></html>");
				return;
			}
		%>
		<div id='gameList'>
			<p align=center>好友的牌局</p>
			<div class='row' >
					
				<div class='positionColumn'><%=posDisp[0]%></div>
				<div class='positionColumn'><%=posDisp[1]%></div>
				<div class='positionColumn'><%=posDisp[2]%></div>
				<div class='positionColumn'><%=posDisp[3]%></div>
						
			</div>
		<%
			for ( int i=0;i<sg.size();i++) {
				ViewGame view = sg.getViewGame(i);
				int gameId = view.getGameId();
			
		%>
		
				<div class='row' id='<%=i%>'  >
					<div class='positionColumn' onClick="gameAction.joinGameAtPos('<%=gameId%>','<%=positions[0]%>')" > 
						<img id='<%=positions[0]+"_"+gameId%>' class='icon' src='<%=view.getPlayerImageUrl(0)%>' >
						<div id='<%=positions[0]+"_"+gameId+"_PlayerName"%>'><%=view.getPlayerDesc(0)%></div>
					</div>
					<div class='positionColumn' onClick="gameAction.joinGameAtPos('<%=gameId%>','<%=positions[1]%>')" > 
						<img id='<%=positions[1]+"_"+gameId%>' class='icon' src='<%=view.getPlayerImageUrl(1)%>' >
						<div id='<%=positions[1]+"_"+gameId+"_PlayerName"%>'><%=view.getPlayerDesc(1)%></div>
					</div>
					<div class='positionColumn' onClick="gameAction.joinGameAtPos('<%=gameId%>','<%=positions[2]%>')" > 
						<img id='<%=positions[2]+"_"+gameId%>' class='icon' src='<%=view.getPlayerImageUrl(2)%>' >
						<div id='<%=positions[2]+"_"+gameId+"_PlayerName"%>'><%=view.getPlayerDesc(2)%></div>
					</div>
					<div class='positionColumn' onClick="gameAction.joinGameAtPos('<%=gameId%>','<%=positions[3]%>')" > 
						<img id='<%=positions[3]+"_"+gameId%>' class='icon' src='<%=view.getPlayerImageUrl(3)%>' >
						<div id='<%=positions[3]+"_"+gameId+"_PlayerName"%>'><%=view.getPlayerDesc(3)%></div>
					</div>
				</div>
		
		<%
			}
		%>
		
		</div>
	</body>
</html>
