<%@ page language='java'  %>
<%@ include file="/weixinmj/import_inc.jsp" %>

$(document).ready(function() {
	  $("#testButton").click(function(){
		$.ajax({
			url: "http://mjoosbt.ddns.net/wxmj?timestamp=1462116203&nonce=2111577250&signature=cc019d848cda9cd9ccd27d3b00c960728aca946f&echostr=580920519105167345", 
			async: true, 
			success: function(result){
				$("#demo").html(result);
			}
		})
	  });

});
