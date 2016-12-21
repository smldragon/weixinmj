<%@ page language="java" contentType="text/html; charset=utf-8"  %>
<%@ include file="GlobalVariables.jsp" %>
<!DOCTYPE html>
<html>
<head>
    
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
    <title>微信麻将--样本库</title>
	<link rel="stylesheet" type="text/css" href="css/WeUi-1-1-0/weui.css" />
</head>
<body >
<script>
function test() {
	
	dialog.title="this is test title";
	dialog.message = "this is test message";
	dialog.okButtonText = "OK";
	dialog.cancelButtonText = "CANCEL";
	dialog.okFunction = "alert('this is OK button ')";
	dialog.cancelFunction = "alert('this is CANCEL button ')";

	dialog.show();
	
}

window.onload=test();
</script>

</body>
</html>