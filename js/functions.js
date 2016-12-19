var webSocketObj = new function() {
	//define a variable to function which is assigned in startGame.js etc.... -- XFZ@2016-08-25
	var callBackListeners = new Array();
	var listenerIndex = 0;
	var socket;
	var mjServerHost = globalVariables.mjServerHost;
	var mjServletName = globalVariables.mjServletName;
	var openId;
	var WeiXinMaJiangProtocol = globalVariables.WeiXinMaJiangProtocol;
	var openIdName = globalVariables.openIdName;
	var WebSocketEventTypeHandler = globalVariables.WebSocketEventTypeHandler;
	var ErrMsgHandler = globalVariables.ErrMsgHandler;
			
	
	return {
		
		setOpenId: function(openId_) {
			openId = openId_;
		},
		getOpenId: function() {
			return openId;
		},
		initWebSocket: function(name) {
			if ( typeof(openId) === 'undefined') {
				alert('初始化错误，openId未被设置');
				return;
			}
			
			if ( typeof(socket) === 'undefined' || socket === null) {
		
				socket = new WebSocket("ws://"+mjServerHost+"/"+mjServletName+"?"+openIdName+"="+openId+"&name="+name, WeiXinMaJiangProtocol);
				socket.onopen = function(msg) {
				};
				socket.onmessage = callBack;
			}
		},
		sendData: function (data) {
	
			if ( typeof(socket) === 'undefined' || socket === null || socket.readyStatus === 0) {
				var tryCount = 0;
				while ( (socket == null || socket.readyStatus == 0) && tryCount < 10) {
					window.setTimeout( this.initWebSocket('trying to open '+tryCount+' times'), 5000);
					tryCount = tryCount + 1;
				}
			}
			if ( socket.readyState === 0) {
				alert('网络似乎有问题，请稍后再试');
				return;
			} 
	
			socket.send(data);
		},
		addListener: function(l) {
			callBackListeners[listenerIndex] = l;
			listenerIndex++;
		}
	};
	function callBack(msg) {
			
		var messageEvent = msg; //msg.originalEvent;
		var jsonData = jQuery.parseJSON(messageEvent.data);
		
		var err = jsonData[ErrMsgHandler];
		var type = jsonData[WebSocketEventTypeHandler];
		for (var index in callBackListeners) {
			var listener = callBackListeners[index];
			if ( type === listener.getType()) {
				if ( err === undefined) {
					err = '';
				}
				if ( err != '') {
					listener.onError(jsonData,err);
				} else {
					listener.onSuccess(jsonData);
				}
			}
		}
	};

}();

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
			url: mjServerUrl+wxAccessTokenAction, 
			async: false, 
			success: function(result){
				var parsedData = JSON.parse(result);
				access_token_timestamp =  parsedData.timestamp; //new Date().getTime();
				access_token_duration = parsedData.expires_in*1000;
				access_token = parsedData.access_token;
			},
			error: function(xhr, error){
				console.debug(xhr); 
				console.debug(error);
				alert('ERROR MESG\n'+error);
			}
		});
	}
	return access_token;
}

function sendMessageToFriendCircle(message,link,imgUrl) {
	
	wx.onMenuShareTimeline({
		title: message, // 分享标题
		link: link, // 分享链接
		imgUrl: imgUrl, // 分享图标
		success: function () { 
			// 用户确认分享后执行的回调函数
			alert(message);
		},
		cancel: function () { 
			// 用户取消分享后执行的回调函数
			alert('分享朋友圈失败');
		}
	});
}

function initWxConfig() {
	
	var isDebug = globalVariables.isDebug;
	var appId = globalVariables.appId;
	var jsSdkConfig_timeStamp = globalVariables.jsSdkConfig_timeStamp;
	var jsSdkConfig_nonceStr = globalVariables.jsSdkConfig_nonceStr;
	var jsSdkConfig_signature = globalVariables.jsSdkConfig_signature;
	
	wx.config({
		debug: isDebug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		appId: appId, // 必填，公众号的唯一标识
		timestamp: jsSdkConfig_timeStamp, // 必填，生成签名的时间戳
		nonceStr: jsSdkConfig_nonceStr, // 必填，生成签名的随机串
		signature: jsSdkConfig_signature,// 必填，签名，见附录1
		jsApiList : [ 'checkJsApi', 'onMenuShareTimeline',
								'onMenuShareAppMessage', 'onMenuShareQQ',
								'onMenuShareWeibo', 'hideMenuItems',
								'showMenuItems', 'hideAllNonBaseMenuItem',
								'showAllNonBaseMenuItem', 'translateVoice',
								'startRecord', 'stopRecord', 'onRecordEnd',
								'playVoice', 'pauseVoice', 'stopVoice',
								'uploadVoice', 'downloadVoice', 'chooseImage',
								'previewImage', 'uploadImage', 'downloadImage',
								'getNetworkType', 'openLocation', 'getLocation',
								'hideOptionMenu', 'showOptionMenu', 'closeWindow',
								'scanQRCode', 'chooseWXPay',
								'openProductSpecificView', 'addCard', 'chooseCard',
								'openCard' ]
	});
	wx.error(function(res){

		alert('wx config err message '+res);
		// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

	});
}
var gameAction = function () {
	
	var webSocketGameEvent = globalVariables.webSocketGameEvent;
	var WebSocketEventActionModeHandler = globalVariables.WebSocketEventActionModeHandler;
	var gameId;
	var startGame = false;
	var requestPosition = false;
	//a websocket call back function bound in startGame.js
	var setPlayer = {
		
		getType: function(){ return webSocketGameEvent;},
		onError: function(jsonData,err) {
			alert(err);
			populateGameInfo(jsonData);
		},
		onSuccess: function(jsonData) {
				
			//WebSocketEventActionModeHandler is defined  in GlobalVariables.jsp
			var mode = jsonData[WebSocketEventActionModeHandler];
			var gameIdFromServer = jsonData['GameId'];
			if ( mode === 'insert' || mode ==='update' ) {
				
				if (  requestPosition === false || startGame === true) {
					populateGameInfo(jsonData);
				} else  {
					var href = '/weixinmj/startGame.jsp?gameId='+gameIdFromServer+'&'+'openId'+'='+webSocketObj.getOpenId();
					window.location = href;
					requestPosition = false;
					startGame = true;
					return;
				}
						
			} else if ( mode === 'rejectByHost') {
						
				requestPosition = false;
				populateGameInfo(jsonData);
				//if ( mode === 'rejectByHost' ) {
					alert('庄家拒绝加入请求');
				//}
						
			} else if ( mode === 'request') {
				
				requestPosition = false;				
				var message = jsonData.nick+"请求加入"+jsonData.posDisp;
				var r = showDialog(message);
				var requestMode;
				if (r == true ) {
					requestMode = 'approve';
				} else {
					requestMode = 'reject';
				}
				
				//server filters listener by type, WebSocketEventTypeHandler is defined in js_inc.jsp -- XFZ@2016-08-25, 
				var jsonString = {'action': 'joingame','mode':requestMode,'openId': jsonData.openId, 'gameId': jsonData.gameId,'position': jsonData.position};
				jsonString[globalVariables.WebSocketEventTypeHandler] = webSocketGameEvent;
				webSocketObj.sendData(JSON.stringify(jsonString));
			}
		}
	}	
	webSocketObj.addListener(setPlayer);
	return {
		
		joinGameAtPos: function(gameId,pos) {
			
			requestPosition = true;
			var openId = webSocketObj.getOpenId();
			$('#'+pos+'_'+gameId+'_PlayerName').html('等待同意');
			$('#'+pos+'_'+gameId).attr('src', '/weixinmj/icon/progress.gif');
			$('#'+pos+'_'+gameId).attr('class', 'icon');
			
			//server filters listener by type, WebSocketEventTypeHandler is defined in js_inc.jsp -- XFZ@2016-08-25, 
			var jsonString = {'action': 'joingame','mode':'request','gameId': gameId,'position': pos};
			jsonString[globalVariables.WebSocketEventTypeHandler] = webSocketGameEvent;
			jsonString[globalVariables.openIdName] = openId;
			webSocketObj.sendData(JSON.stringify(jsonString));
		},
		setGameId: function(gameId_) {
			gameId = gameId_;
		},
		setStartGame: function(startGame_) {
			startGame = startGame_;
		}
	};
	function populateGameInfo(jsonData) {
		
		var gameIdFromServer = jsonData['GameId'];
		$('#east_'+gameIdFromServer+'_PlayerName').text(jsonData.EastName);
		$('#west_'+gameIdFromServer+'_PlayerName').text(jsonData.WestName);
		$('#north_'+gameIdFromServer+'_PlayerName').text(jsonData.NorthName);
		$('#south_'+gameIdFromServer+'_PlayerName').text(jsonData.SouthName);
						
		$('#east_'+gameIdFromServer).attr("src", jsonData.EastImageUrl);
		$('#west_'+gameIdFromServer).attr("src", jsonData.WestImageUrl);
		$('#north_'+gameIdFromServer).attr("src", jsonData.NorthImageUrl);
		$('#south_'+gameIdFromServer).attr("src", jsonData.SouthImageUrl); 				
	}
	
}();

var configSetting = function () {
	
	return {
		
		setPlayerScoreSetting: function() {
			
		},
		setGameScoreSetting: function() {
			
		}
	};
	function settingCallBack(msg) {
		
	};
	
}();

function showDialog(txt) {
	var confirmation = confirm(txt);
	return confirmation;
}
function showDialog_jquery(title, txt) {
	var $dialogDiv = $('<div>');
	$dialogDiv.html(txt);
	$dialogDiv.dialog({
        title: title,
        modal: true,
        close: function() {
            $(this).dialog('destroy').remove();
        },
        buttons: [{
            text: "Ok",
            click: function() {
                $(this).dialog("close");
            }}]
    })
}
var selectTagMethod = {
	
	setSelectedByValue: function(selectTagElementName,value) {
			
		var sel = document.getElementById(selectTagElementName);
		for(var i = 0; i < sel.options.length; i++ ) {
			if(sel.options[i].value === value) {
				sel.selectedIndex = i;
				break;
			}
		}
	},
	setSelectedByDisplay: function(selectTagElementName,displayText) {
		var sel = document.getElementById(selectTagElementName);
		for(var i = 0; i < sel.options.length; i++ ) {
			if(sel.options[i].innerHTML === displayText ) {
				sel.selectedIndex = i;
				break;
			}
		}
	}
}

function CellSelection(parentElementName_,imgClassName_ ) {

	var value = null;	
	return {
		
		setValueByElementId: function(element) {
			
			var id = element.id;
			this.setValue(id);
		},
		setValue: function(newValue) {
			
			if ( newValue === value) {
				return;
			}
			
			var parentElement = document.getElementById(parentElementName_);
			var newValueElement = getChildById(parentElement,newValue);
			setChildImgDisplayProperty(newValueElement,'');
			
			var oldValueElement = getChildById(parentElement,value);
			setChildImgDisplayProperty(oldValueElement,'none');
			
			value = newValue;
		},
		getValue: function() {
			return value;
		}
	}
	function setChildImgDisplayProperty(parentEle,display) {

		if ( parentEle === null) {
			return;
		}

		var imgClassElement = getChildByClassType(parentEle,"weui-icon-success-no-circle");
		if ( imgClassElement !== null) {

			imgClassElement.style.display = display;
		}
	}
	function getChildById(parentElement,childId) {
		
		if ( parentElement === null) {
			return null;
		}
		var index=0;
		var childNodes = parentElement.childNodes;
		
		if ( typeof(childNodes) ==='undefined') {
			return null;
		}
		var childNodeLength = childNodes.length;
		for( index=0; index<childNodeLength; index++) {
			if ( childNodes[index].id === childId ) {
				return childNodes[index];
			}
			if ( childNodes[index].nodeType === 1 ) { // filter for element node
				var result = getChildById(childNodes[index],childId);
				if ( result != null && result.id === childId) {
					return result;
				} 
			} 
		}
		return null;
	}
	function getChildByClassType(parentElement,classType) {
		
		var index=0;
		var childNodes = parentElement.childNodes;
		var childNodeLength = childNodes.length;
		for( index=0; index<childNodeLength; index++) {
			if ( childNodes[index].className === classType ) {
				return childNodes[index];
			}
			if ( childNodes[index].nodeType === 1 ) { // filter for element node
				var result = getChildByClassType(childNodes[index],classType);
				if ( result != null && result.className === classType) {
					return result;
				} 
			} 
		}
		return null;
	}
};

function isElementHidden (ele) {
    var visible = window.getComputedStyle(ele, null).getPropertyValue('display') === 'none';
	return visible;
}

var horizontalToggle = function() {
	
	return {
		
		slideFromRight: function(obj) {
			
			slideHorizontally(obj,'marginRight');
		},
		slideFromLeft: function(obj) {
			
			slideHorizontally(obj,'marginLeft');
		}
	};
	function slideHorizontally(obj,marginName) {
		
		var visibility = getObjectVisibility(obj);
		if ( visibility === '') {
			hideObject(obj);
		} else if ( visibility === 'none' ) {
			showObject(obj);
			slideObjectToVisible(obj,marginName);
		} else {
			hideObject(obj);
			slideObjectToVisible(obj,marginName);
		}
	}
	function showObject(obj) {
		obj.style.display = ''; //can't use obj.style.visibility='hidden', hidden just hide the div content, but still occupies the position
	}
	function hideObject(obj) {
		obj.style.display = 'none'; //can't use obj.style.visibility='hidden', hidden just hide the div content, but still occupies the position
	}
	function slideObjectToVisible(obj,marginName) {
		
		var margin = obj.style[marginName];
		if ( typeof(margin) === 'undefined' || margin==='') {
			margin = "0";
		}
		margin = margin.trim();
		
		if ( margin.endsWith("px")) {
			margin = margin.substring(0, margin.length-2);
		}
		slideToVisible(obj,-300,margin,marginName);
	}
	function slideToVisible(obj,fromLoc,toLoc,marginName) {
	
		if(fromLoc >= toLoc){  
			setMargin(obj,marginName,toLoc);				
			return;  
		}else {
		   
			setMargin(obj,marginName,fromLoc);
			setTimeout(function(){
			   slideToVisible(obj, fromLoc + 5, toLoc,marginName);
		   }, 1);
	   }
	}
	function setMargin(obj,marginName,margin) {
		obj.style[marginName] = margin + "px";
	}
}();
function getObjectVisibility(obj) {
		
	var visibility = obj.style.visibility;
	if ( typeof(visibility) === 'undefined' || visibility === '') {
		visibility = obj.style.display;
	}
	return visibility;
};
function isObjectVisible(obj) {
	var visibility = getObjectVisibility(obj);
	if ( visibility==='none' || visibility==='hidden') {
		return false;
	} else {
		return true;
	}
};
function showToastSuccessPrompt(prompt,duration) {
	$(document.documentElement).append('<div id="toast-success">'+
		'<div class="weui-mask_transparent"></div>'+
		'<div class="weui-toast">'+
		'<i class="weui-icon_toast"></i>'+
		'<div><i class="weui-icon_toast weui-icon-success-no-circle" ></i></div>'+
		'<p class="weui-toast__content">'+prompt+'</p>'+
		'</div></div>');
				
	$("#toast-success").fadeOut(duration,function() {$("#toast-success").remove()} );
};

var loadingPrompt = function() {
	
	var loadingDivId = "loadingToast";
	return {
		show: function(prompt) {
			$(document.documentElement).append(
				'<div id= '+ loadingDivId +' >'+
				'<div class="weui-mask_transparent"></div>'+
				'<div class="weui-toast">'+
				'<i class="weui-loading weui-icon_toast"></i>'+
				'<p class="weui-toast__content">'+prompt+'</p>'+
				'</div></div>'
			);
		},
		hide: function(loadingSuccessPrompt) {
			$("#"+loadingDivId).remove();
			if ( typeof(loadingSuccessPrompt) != 'undefined' ) {
				showToastSuccessPrompt(loadingSuccessPrompt,4000);
			} 
		}
	}
}();
var layeredAlert = function() {
	
	var loadingDivId = "loadingToast";
	return {
		show: function(prompt) {
			$(document.documentElement).append(
				'<div id= '+ loadingDivId +' >'+
				'<div class="weui-mask_transparent"></div>'+
				'<div class="weui-toast">'+
				'<i class="weui-loading weui-icon_toast"></i>'+
				'<p class="weui-toast__content">'+prompt+'</p>'+
				'</div></div>'
			);
		},
		hide: function(loadingSuccessPrompt) {
			$("#"+loadingDivId).remove();
			if ( typeof(loadingSuccessPrompt) != 'undefined' ) {
				showToastSuccessPrompt(loadingSuccessPrompt,4000);
			} 
		}
	}
}();
function showScoreConfigModifier(scoreConfigSettingType,scoreConfigValue) {
	setScoreConfig(scoreConfigSettingType,scoreConfigValue);
	scoreHist.toggleScoreConfig();
}
