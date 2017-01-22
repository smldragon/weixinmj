var webSocketObj = new function() {
	//define a variable to function which is assigned in startGame.js etc.... -- XFZ@2016-08-25
	var callBackListeners = new Array();
	var listenerIndex = 0;
	var socket;
	var mjServerHost = globalVariables.mjServerHost;
	var mjServletName = globalVariables.mjServletName;
	var openId;
	var WeiXinMaJiangProtocol = globalVariables.WeiXinMaJiangProtocol;
	var openIdName = globalVariables.OpenIdName;
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
				showMessage('初始化错误，openId未被设置');
				return;
			}
			
			if ( typeof(socket) === 'undefined' || socket === null || socket.readyState !== 1) {
		
				socket = new WebSocket("ws://"+mjServerHost+"/"+mjServletName+"?"+openIdName+"="+openId+"&name="+name, WeiXinMaJiangProtocol);
				socket.onopen = function(msg) {
				    console.log('Socket Connection Has Been Established!');
			    };
			    socket.onclose = function(msg) {
                	console.log('Socket Connection Has Been CLOSED!');
                };
				socket.onmessage = callBack;
			}
		},
		sendData: function (prompt,data) {
	
			if ( typeof(socket) === 'undefined' || socket === null || socket.readyState !== 1) {
				this.initWebSocket('trying to re-connect ');
			}
			if ( socket.readyState !== 1) {
			    loadingPrompt.hide();
				dispatchError(null,null,'网络似乎有问题，请稍后再试');
				return;
			} 

	        if ( prompt !== null && prompt !=="") {
	            loadingPrompt.show(prompt);
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
		var jsonData = JSON.parse(messageEvent.data);
		
		var err = jsonData[ErrMsgHandler];
		var type = jsonData[WebSocketEventTypeHandler];
		loadingPrompt.hide();
		dispatchError(type,jsonData,err);
	};
	function dispatchError(type,jsonData,err) {
	    for (var index in callBackListeners) {
    		var listener = callBackListeners[index];
    		if ( type === null || type === listener.getType()) {
    		    if ( err === null || typeof(err) === 'undefined' ) {
    			    err = '';
    			}
    			if ( err !== '' && typeof listener.onError === 'function') {
    				listener.onError(jsonData,err);
    				if ( type === null) {
    				    break; //for err and broadcast to all ( type===null), only need to process one time
                    }
    			} else if ( typeof listener.onSuccess === 'function' ) {
    				listener.onSuccess(jsonData);
    			}
    		}
    	}
	}

}();

function consumeAccessToken(accessTokenConsumeFunction) {
	var toFetchFromServer;
	if ( typeof globalVariables.access_token_timestamp ==="undefined" ) {
		toFetchFromServer = true;
	} else {
		var now = new Date().getTime();
		if ( (now - globalVariables.access_token_timestamp )  > globalVariables.access_token_duration) {
			toFetchFromServer = true;
		}else {
			toFetchFromServer = false;
		}
	}
	
	if ( toFetchFromServer) {
        restful( {
            url: globalVariables.mjServerUrl+ globalVariables.wxAccessTokenAction,
            success: function(result){
                var parsedData = JSON.parse(result);
                globalVariables.access_token_timestamp =  parsedData.timestamp; //new Date().getTime();
                globalVariables.access_token_duration = parsedData.expires_in*1000;
                globalVariables.access_token = parsedData.access_token;
                accessTokenConsumeFunction(globalVariables.access_token);
             },
             error: function(xhr, error){
                showTitledMessage('获取AccessToken错误',"错误码:"+error+"<br>xhr.statusText="+xhr.statusText);
             }
        });
	} else {
	    accessTokenConsumeFunction(globalVariables.access_token);
	}
}
function restful(input) {
    var data;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", input.url, true);
    var dataStr;
    var contentType;
    if ( typeof input.data === 'undefined') {
        dataStr = '';
        contentType = "text/plain";
    } else if ( typeof input.data === "string") {
        dataStr = input.data;
        contentType = "text/plain";
    } else {
        dataStr = JSON.stringify(input.data);
        contentType = "application/json";
    }

    var charSet;
    if ( typeof input.charSet === 'undefined') {
        charSet = "utf-8";
    } else {
        charSet = input.charSet;
    }

    xhr.setRequestHeader('Content-Type', contentType+";"+charSet);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if ( xhr.status === 200 &&  typeof input.success !== 'undefined') {
                if (!xhr.responseType || xhr.responseType === "text") {
                    data = xhr.responseText;
                } else if (xhr.responseType === "document") {
                    data = xhr.responseXML;
                } else {
                   data = xhr.response;
                }
                input.success(data);
            } else if ( typeof input.error !== 'undefined') {
                input.error(xhr,xhr.status);
            }
        }
    };
    xhr.onerror = function() {
        if ( typeof input.error !== 'undefined') {
            input.error(xhr,xhr.status);
        }else {
            console.log(xhr);
        }
    };
    xhr.send(dataStr);
}
function sendMessageToFriendCircle(message,link,imgUrl) {
	
	wx.onMenuShareTimeline({
		title: message, // 分享标题
		link: link, // 分享链接
		imgUrl: imgUrl, // 分享图标
		success: function () { 
			// 用户确认分享后执行的回调函数
			showMessage(message);
		},
		cancel: function () { 
			// 用户取消分享后执行的回调函数
			showMessage('分享朋友圈失败');
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
		debug: isDebug, // �?启调试模�?,调用的所有api的返回�?�会在客户端alert出来，若要查看传入的参数，可以在pc端打�?，参数信息会通过log打出，仅在pc端时才会打印�?
		appId: appId, // 必填，公众号的唯�?标识
		timestamp: jsSdkConfig_timeStamp, // 必填，生成签名的时间�?
		nonceStr: jsSdkConfig_nonceStr, // 必填，生成签名的随机�?
		signature: jsSdkConfig_signature,// 必填，签名，见附�?1
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

		showMessage('wx config err message '+res);
		// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打�?config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名�??

	});
}
var gameAction = function () {
    var hostNickName;
    var startTime;
    var endTime;
    var isHost;
    var TempPlayerPrefix;
	var changeGameAction;
	var exitGameMode;
	var joinGameMode;
	var requestGameMode;
	var webSocketGameEvent = globalVariables.webSocketGameEvent;
	var WebSocketEventActionModeHandler = globalVariables.WebSocketEventActionModeHandler;
	var gameId;
	var startGame = false;
	var requestPosition = false;
	var approveMode;
	var isPosting = false;
	var joinPos;
	//a websocket call back function bound in startGame.js
	var setPlayer = {
		
		getType: function(){ return webSocketGameEvent;},
		onError: function(jsonData,err) {
		    isPosting = false;
		    loadingPrompt.hide('');
		    showMessage(err);
		    if ( jsonData !== null ) {
		        if ( jsonData["code"] !== "SeatOccupied"){
                    populateGameInfo(jsonData);
                 }
             }
		},
		onSuccess: function(jsonData) {
		    isPosting = false;
		    loadingPrompt.hide('');
			gameAction.jsonData = jsonData;
			//WebSocketEventActionModeHandler is defined  in GlobalVariables.jsp
			var mode = jsonData[WebSocketEventActionModeHandler];
			var gameIdFromServer = jsonData[globalVariables.GameIdName];
			if ( mode === 'insert' || mode ==='update' || mode ==='exitGame') {
				
				if (  requestPosition === false || startGame === true ) {
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
				//alert('庄家拒绝加入请求');
				showMessage('庄家拒绝加入请求') ;
			} else if ( mode === 'request') {
				
				requestPosition = false;				
				var message = jsonData.nick+"请求加入"+jsonData.posDisp;
				dialog.title="";
                dialog.message = message;
                dialog.okButtonText = "同意";
                dialog.cancelButtonText = "拒绝";
                dialog.okFunction = "gameAction.postRequest('approve');";
                dialog.cancelFunction = "gameAction.postRequest('reject');";
                dialog.show();
			}
		}
	}	
	webSocketObj.addListener(setPlayer);
	return {
        jsonData: '',
		joinGameByMenualUser(menualUserName,pos) {
		    this.joinGameAtPosByUserName(gameAction.getTempPlayerPrefix()+menualUserName,gameAction.getGameId(),pos,'...',gameAction.getApproveMode());
		},
		joinGameAtPos: function(pos) {
            joinPos = pos;
		    if ( isHost ) {
                enterTempPlayer.showEntry(pos);
             } else {
                var openId = webSocketObj.getOpenId();
                var posIndex = positionConvertor.getPositionIndex(pos);
                if ( globalVariables.playerNames[posIndex] !== globalVariables.BlankPlayerName &&
                           globalVariables.playerNames[posIndex] !== globalVariables.posDisp[posIndex] ) {
                    showMessage("请选择一个空位置");
                    return;
                }
                var gameId = gameAction.getGameId();
                this.joinGameAtPosByUserName(openId,gameId,pos,'等待同意',gameAction.getRequestGameMode());
             }
		},
		joinGameByHost: function() {
		    var openId = webSocketObj.getOpenId();
		    var gameId = gameAction.getGameId();
		    gameAction.joinGameAtPosByUserName(openId,gameId,joinPos,'等待同意',gameAction.getRequestGameMode());
		    enterTempPlayer.hide();
		},
		joinGameAtPosByUserName: function(userName,gameId,pos,waitPrompt,mode) { //userToken can be manually entered abitrary name
			if ( isPosting === true) {
			    showMessage('请等待上一次任务结束');
			    return;
			}

			isPosting = true;
			requestPosition = true;
            document.getElementById(pos+'_'+gameId+'_PlayerName').innerHTML = waitPrompt;
            document.getElementById(pos+'_'+gameId).setAttribute("src","/weixinmj/icon/progress.gif");
            document.getElementById(pos+'_'+gameId).setAttribute("class","icon");

			//server filters listener by type, WebSocketEventTypeHandler is defined in js_inc.jsp -- XFZ@2016-08-25,
			var json = {};
			json[globalVariables.MessageActionHandler] = gameAction.getChangeGameAction();
			json[globalVariables.MessageModeHandler] = mode;
			json[globalVariables.GameIdName] = gameId;
			json['position'] = pos;
			json[globalVariables.WebSocketEventTypeHandler] = webSocketGameEvent;
			json[globalVariables.OpenIdName] = userName;
			var jsonString = JSON.stringify(json);
			webSocketObj.sendData("",jsonString);
		},
		setIsHost: function(isHost_) {
		    isHost = isHost_;
		},
		getIsHost: function() {
		    return isHost;
		},
		setGameId: function(gameId_) {
			gameId = gameId_;
		},
		getGameId: function() {
		    return gameId;
		},
		setStartGame: function(startGame_) {
			startGame = startGame_;
		},
		setChangeGameAction: function(action) {
		    changeGameAction = action;
		},
		getChangeGameAction: function() {
		    return changeGameAction;
		},
		setApproveMode(approveMode_) {
		    approveMode = approveMode_;
		},
		getApproveMode() {
		    return approveMode;
		},
		setJoinGameMode: function(mode) {
            joinGameMode = mode;
        },
        getJoinGameMode: function() {
            return joinGameMode;
        },
        setExitGameMode: function(mode) {
            exitGameMode = mode;
         },
         getExitGameMode: function() {
             return exitGameMode;
         },
         setRequestGameMode: function(mode) {
            requestGameMode = mode;
         },
         getRequestGameMode: function() {
            return requestGameMode;
         },
         getTempPlayerPrefix: function() {
            return TempPlayerPrefix;
         },
         setTempPlayerPrefix: function(TempPlayerPrefix_) {
            TempPlayerPrefix = TempPlayerPrefix_;
         },
		postRequest: function(mode) {
             //server filters listener by type, WebSocketEventTypeHandler is defined in js_inc.jsp -- XFZ@2016-08-25,
              var jsonString = {};
              jsonString[globalVariables.MessageActionHandler] = gameAction.getChangeGameAction();
              jsonString[globalVariables.MessageModeHandler] = mode;
              jsonString[globalVariables.OpenIdName] = this.jsonData[globalVariables.OpenIdName];
              jsonString[globalVariables.GameIdName] = this.jsonData[globalVariables.GameIdName];
              jsonString['position'] = this.jsonData.position;
              jsonString[globalVariables.WebSocketEventTypeHandler] = webSocketGameEvent;
              webSocketObj.sendData("",JSON.stringify(jsonString));
        }
	};
	function populateGameInfo(jsonData) {
		
		var gameIdFromServer = jsonData[globalVariables.GameIdName];
		var scoresDiv = document.getElementById("scores");
		for(var i=0;i<4;i++) {
		    var pos = globalVariables.positions[i];
		    var playerName = jsonData[capitalizeFirstLetter(pos)+'Name'];
		    document.getElementById(pos+'_'+gameIdFromServer+'_PlayerName').innerHTML=playerName;
		    document.getElementById(pos+'_'+gameIdFromServer).setAttribute("src", jsonData[capitalizeFirstLetter(pos)+'ImageUrl']);
		    globalVariables.playerNames[i]=getPlayerName(pos,jsonData);
		    //修改得分表的位置行
		    var playerDivInScoresTable = getElementFromParent(scoresDiv,pos+"PlayerName");
		    playerDivInScoresTable.innerHTML = playerName;
		}
	}
	function getPlayerName(pos,jsonData) {
	    var serverValue = jsonData[capitalizeFirstLetter(pos)+"Name"];
	    return positionConvertor.getPlayerNameAtPos(pos,serverValue);
	};
}();
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

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
function showMessage(message) {
    showTitledMessage("",message);
}
function showTitledMessage(title,mesg) {
	dialog.title=title;
    dialog.message = mesg;
    dialog.okButtonText = "知道了";
    dialog.cancelButtonText = "";
    dialog.okFunction = "";
    dialog.cancelFunction = "";
    dialog.show();
}
function showTitledMessageWithCallback(title,mesg,callBack) {
	dialog.title=title;
    dialog.message = mesg;
    dialog.okButtonText = "知道了";
    dialog.cancelButtonText = "";
    dialog.okFunction = callBack;
    dialog.cancelFunction = "";
    dialog.show();
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
    //var body = $(document.documentElement);
    var body = document.body;
	appendDiv(body,'<div id="toast-success">'+
		'<div class="weui-mask_transparent"></div>'+
		'<div class="weui-toast">'+
		'<i class="weui-icon_toast"></i>'+
		'<div><i class="weui-icon_toast weui-icon-success-no-circle" ></i></div>'+
		'<p class="weui-toast__content">'+prompt+'</p>'+
		'</div></div>');
	var toastSuccess = document.getElementById("toast-success");
	toastSuccess.fadeOut(duration,function() {toastSuccess.remove()} );
	//$("#toast-success").fadeOut(duration,function() {$("#toast-success").remove()} );
};

var loadingPrompt = function() {
	
	var loadingDivId = "loadingToast";
	return {
		show: function(prompt) {
		    //var body = $(document.documentElement);
            var body = document.body;
			appendDiv(body,
				'<div id= '+ loadingDivId +' >'+
				'<div class="weui-mask_transparent"></div>'+
				'<div class="weui-toast">'+
				'<i class="weui-loading weui-icon_toast"></i>'+
				'<p class="weui-toast__content">'+prompt+'</p>'+
				'</div></div>'
			);
		},
		hide: function(loadingSuccessPrompt) {
		    var loadingDivVar = document.getElementById(loadingDivId);
		    if ( loadingDivVar != null ) {
			    loadingDivVar.remove();
			}
			if ( typeof(loadingSuccessPrompt) != 'undefined' && loadingSuccessPrompt != '') {
				showToastSuccessPrompt(loadingSuccessPrompt,4000);
			} 
		}
	}
}();
var dialog = function() {
	
	var dialogDiv = "dialogDiv";
	return {
	    message: '',
	    okButtonText : '确定',
	    cancelButtonText : '取消',
	    okFunction : '',
	    cancelFunction:'' ,

		show: function() {
		    var divContent = '<div id='+dialogDiv+' class="weui_dialog_confirm">' +
                '<div class="weui-mask"></div>'+
                 '<div class="weui-dialog">'+
                  '<div class="weui-dialog__hd"><strong class="weui-dialog__title">'+this.title+'</strong></div>'+
                   '<div class="weui-dialog__bd">'+this.message+'</div>'+
                    '<div class="weui-dialog__ft">';

             if ( this.cancelButtonText != '' ) {
                divContent = divContent + '<a href="#" class="weui-dialog__btn default" onClick=dialog.doCancelFunction()  >'+this.cancelButtonText+'</a>';
             }
             if ( this.okButtonText != '' ) {
                divContent = divContent + '<a href="#" class="weui-dialog__btn default" onClick=dialog.doOkFunction()  >'+this.okButtonText+'</a>';
             }

            divContent = divContent +'</div>'+'</div>'+ '</div>';
            //var body = $(document.documentElement);
            var body = document.body;
            appendDiv(body,divContent);
		},
		doOkFunction: function () {
            eval(this.okFunction);
        	this.hide();
        },
        doCancelFunction:function () {
            eval(this.cancelFunction);
        	this.hide();
        },
        hide:   function () {
           document.getElementById(dialogDiv).remove();
         }
	};
}();
function appendDiv(parent,divHtml) {
    var divContentObj = document.createElement('div');
    divContentObj.innerHTML = divHtml;
    parent.appendChild(divContentObj);
}
function showScoreConfigModifier(scoreConfigSettingType,scoreConfigValue) {
	setScoreConfig(scoreConfigSettingType,scoreConfigValue);
	scoreHist.toggleScoreConfig();
}
function getElementInsideContainer(containerID, childID) {
    var parent = document.getElementById(containerID);
    return getElementFromParent(parent,childID);
}
function getElementFromParent(parent, childID) {
    var elm = {};
    var elms = parent.getElementsByTagName("*");
    for (var i = 0; i < elms.length; i++) {
        if (elms[i].id === childID) {
            elm = elms[i];
            break;
        }
    }
    return elm;
}
function getElementInsideContainerByName(containerID, childName) {
    var elm = {};
    var elms = document.getElementById(containerID).getElementsByTagName("*");
    for (var i = 0; i < elms.length; i++) {
        if (elms[i].name === childName) {
            elm = elms[i];
            break;
        }
    }
    return elm;
}
var positionConvertor = function () {
    return {
        blankPlayerName: '',
        convertToPlayerNameStatus: false,
        getPositionIndex: function(pos) {
             for(var i=0;i<globalVariables.positions.length;i++) {
                if ( globalVariables.positions[i] === pos) {
                    return i;
                }
             }
             return -1;
        },
        convertToDisplay(posName) {
            for(var i=0;i<globalVariables.positions.length;i++) {
                if ( globalVariables.positions[i] === posName) {
                    return globalVariables.posDisp[i];
                }
            }
            return {};
        },
        convertToName(posDisplay) {
            for(var i=0;i< globalVariables.posDisp.length;i++) {
                if ( globalVariables.posDisp[i] === posDisplay) {
                    return globalVariables.positions[i];
                 }
              }
              return {};
        },
        convertToPlayerName(posName) {
            if ( this.convertToPlayerNameStatus === false) {
                this.convertToPlayerNameStatus = true;
                for(var i=0;i<globalVariables.playerNames.length;i++) {
                    globalVariables.playerNames[i]= this.getPlayerNameAtPos(globalVariables.positions[i],globalVariables.playerNames[i]);
                }
            }

             for(var i=0;i<globalVariables.positions.length;i++) {
                if ( globalVariables.positions[i] === posName) {
                    return globalVariables.playerNames[i];
                 }
             }
             return {};
        },
        getPlayerNameAtPos: function(pos,serverValue) {
            if ( serverValue === this.blankPlayerName) {
                return this.convertToDisplay(pos);
             } else {
                 return serverValue;
             }
        }
    }
}();