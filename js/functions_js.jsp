<%@ page language='java'  %>
<%@ include file="/weixinmj/import_inc.jsp" %>
//这个文件已经不用了 -- 2017-01-18
function getAccessToken() {
	var toFetchFromServer;
	if ( typeof access_token_timestamp ==="undefined" ) {
		toFetchFromServer = true;
	} else {
		var now = new Date().getTime();
		if ( (now - access_token_timestamp )  > access_token_duration) {
			toFetchFromServer = true;
		}else {
			toFetchFromServer = false;
		}
	}
	
	if ( toFetchFromServer) {
		$.ajax({
			url: mjServerUrl+'<%=WxMjConstants.WxAccessToken%>', 
			async: false, 
			success: function(result){
				var parsedData = JSON.parse(result);
				access_token_timestamp =  parsedData.timestamp; //new Date().getTime();
				access_token_duration = parsedData.expires_in*1000;
				access_token = parsedData.access_token;
				//$("#demo").html(result);
			},
			error: function(xhr, error){
				console.debug(xhr); 
				console.debug(error);
				alert(error);
			}
		});
	}
	return access_token;
}
