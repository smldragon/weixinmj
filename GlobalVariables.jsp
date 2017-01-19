<%@ page language='java'  %>
<%@ include file="/weixinmj/import_inc.jsp" %>

<%
	JsSdkConfig jsSdkConfig = new JsSdkConfig(request,WeiXinConstants.WeiXinAccountSetting);
	DyGamePosition [] allPosValues = DyGamePosition.values();
	String [] posDisp = new String [allPosValues.length];   //{"东","南","西","北"}
	String [] positions = new String [allPosValues.length]; //{"east","south","west","north"}
	
	int index = 0;
	for(DyGamePosition pos: allPosValues) {
		posDisp [index] = pos.getDisplay();
		positions[index] = pos.getName();
		index++;
	}
%>
 
<script>
	var globalVariables ={
		WebSocketEventTypeHandler: '<%=StringConstants.WebSocketEventTypeHandler%>',
		WebSocketEventActionModeHandler : '<%=StringConstants.WebSocketEventActionModeHandler%>',
		ErrMsgHandler : '<%=StringConstants.ErrMsgHandler%>',
		OpenIdName : '<%=WeiXinConstants.OpenIdName%>',
		GameIdName : '<%=WxMjConstants.GameIdName%>',
		WeiXinMaJiangProtocol : '<%=WxMjConstants.WeiXinMaJiangProtocol%>',
		MessageModeHandler: '<%=StringConstants.MessageModeHandler%>',
        MessageActionHandler: '<%=StringConstants.MessageActionHandler%>',
		//define global js constants for later use
		wxAccessTokenAction : '<%=WeiXinActions.WxAccessToken%>',
		mjServerHost : '<%=WxMjConstants.WxMjHost%>',
		mjServletName : '<%=WxMjConstants.WxMjServletName%>',
		mjServerUrl : '<%="http://"+WxMjConstants.WxMjHost+"/"+WxMjConstants.WxMjServletName+"?action="%>',
		mjJspPath : '<%="http://"+WxMjConstants.WxMjHost+"/"+WxMjConstants.WxMjRelativePath+"/"%>',
		access_token_timestamp: '',
		access_token_duration: '',
		access_token: '',
		isDebug: false,
	
		positions : ['<%=positions[0]%>','<%=positions[1]%>','<%=positions[2]%>','<%=positions[3]%>'], //{"east","south","west","north"}
		positionTotal : new Array(), //得分
		positionNet : new Array(), //赢分
		posDisp : ['<%=posDisp[0]%>','<%=posDisp[1]%>','<%=posDisp[2]%>','<%=posDisp[3]%>'],           //{"东","南","西","北"}
	    playerNames: [], //set in functions.js, gameAction.populateGameInfo
		webSocketScoreEvent : '<%=WxMjConstants.WebSocketScoreEvent%>',
		webSocketGameEvent : '<%=WxMjConstants.WebSocketGameEvent%>',
		webSocketScoreConfigSettingEvent: '<%=WxMjConstants.WebSocketScoreConfigSettingEvent%>',
		scoreConfigSettingHandler : '<%=WxMjConstants.ScoreConfigSettingHandler%>',
		//global variables
		appHost : '<%=WxMjConstants.WxMjHost%>',
		appId : '<%=jsSdkConfig.accountSetting.appId%>',
		jsSdkConfig_timeStamp : '<%=jsSdkConfig.timeStamp%>',
		jsSdkConfig_nonceStr : '<%=jsSdkConfig.nonceStr%>',
		jsSdkConfig_signature :	'<%=jsSdkConfig.signature()%>'


	};
	
	if ( '<%=jsSdkConfig.isDebug%>' == 'false') {
		globalVariables.isDebug = false;
	} else {
		//isDebug = true;
		globalVariables.isDebug = true;
	}
 
</script>

<!-- script src="js/jquery-3.0.0.min.js"></script -->
<script src="http://res.wx.qq.com/open/js/jweixin-1.1.0.js"></script>
<script src="js/functions.js"></script>
<script src="js/score.js"></script>

