<%@ page language="java" contentType="text/html; charset=utf-8"  %>
<%@ include file="GlobalVariables.jsp" %>
<!DOCTYPE html>
<html>
<head>
    
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
    <title>微信麻将--样本库</title>
	<link rel="stylesheet" type="text/css" href="css/WeUi-1-1-0/weui.css" />
</head>
<body>
	
<div class="weui-cells weui-cell_access">

    <a class="weui-cell" href="#">
        <div class="weui-cell__bd weui_cell_primary">
            <p>cell standard</p>
        </div>
		 <div class="weui-cell__hd">
			<i class="weui-icon-success-no-circle"></i>
        </div>
    </a>
    <a class="weui-cell" href="#">
        <div class="weui-cell__hd">
            <img src="" alt="icon" style="width:20px;margin-right:5px;display:block">
        </div>
        <div class="weui-cell__bd weui_cell_primary">
            <p>cell standard</p>
        </div>
        <div class="weui-cell__ft">
            说明文字
        </div>
    </a>
</div>


<script>
	showLoadingPrompt('正在保存');
</script>
</body>
</html>