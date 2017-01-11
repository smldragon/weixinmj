<%
    String [] tempEntryActions = new String [posDisp.length];
    if ( isHost ) {
        for(int i=0;i< posDisp.length;i++) {
            posDisp[i]=posDisp[i]+" +";
            tempEntryActions[i] = "enterTempPlayer.showEntry(\""+positions[i]+"\")";
        }
    } else {
        for(int i=0;i< tempEntryActions.length;i++) {
            tempEntryActions[i] = "";
        }
    }

    final String addScoreDialogDivId = "addScoreDialogDivId";
%>
<script>

    addScoreDialog.addScoreDialogDivId='<%=addScoreDialogDivId%>';
    globalVariables.playerNames[0] = '<%=view.getPlayerDesc(0)%>';
    globalVariables.playerNames[1] = '<%=view.getPlayerDesc(1)%>';
    globalVariables.playerNames[2] = '<%=view.getPlayerDesc(2)%>';
    globalVariables.playerNames[3] = '<%=view.getPlayerDesc(3)%>';
</script>
<div id="scores" style="width:100%" >
			
	<div class="RowHeader">
			
		<div class="PositionTouLie"  style="width:15%;">
			位置
		</div>
				
		<div class="PositionTouLie"  style="width:20%;">
			玩家
		</div>
				
		<div class="PositionTouLie"  style="width:20%;">
			总分
		</div>
		
		<div class="PositionTouLie"  style="width:20%;">
			净赢分
		</div>	
		
		<div class="PositionTouLie"  style="width:25%;">
			去算分
		</div>
				
	</div>
			
	<div class="PositionHang1">
			
		<div class="PositionWeiZhiLie" onClick='<%=tempEntryActions[0]%>'>
			<%=posDisp[0]%><!--东-->
		</div>

		<div class="PositionWanJiaLie">
			<div class='row' onClick="gameAction.joinGameAtPos('<%=gameId%>','<%=positions[0]%>')" >                 
				<img class="Playerimg" id='<%=positions[0]+"_"+gameId%>' class='icon' src='<%=view.getPlayerImageUrl(0)%>' >
				<div class="PlayerName" id='<%=positions[0]+"_"+gameId+"_PlayerName"%>'><%=view.getPlayerDesc(0)%></div>
			</div>
		</div>
					
		<div id='eastTotal' class="PositionZongFenLie">
			<%=positionTotal[0]%>
		</div>
		
		<div id='eastTotal' class="PositionDeFenLie">
			<%=positionTotal[0]%>
		</div>
				
		<div class="PositionJiFenLie">
			<!-- input class="inputJiFen" id='eastScore' type='text' / -->
			<a href='#' onClick='addScoreDialog.show("east")' style="color: black;">我胡了</a>
		</div>
				
	</div>
			
	<div class="PositionHang1">

		<div class="PositionWeiZhiLie" onClick='<%=tempEntryActions[1]%>'>
			<%=posDisp[1]%><!--南-->
		</div>
					
		<div class="PositionWanJiaLie">
			<div class='row' onClick="gameAction.joinGameAtPos('<%=gameId%>','<%=positions[1]%>')" >                 
				<img class="Playerimg" id='<%=positions[1]+"_"+gameId%>' class='icon' src='<%=view.getPlayerImageUrl(1)%>' >
				<div class="PlayerName" id='<%=positions[1]+"_"+gameId+"_PlayerName"%>'><%=view.getPlayerDesc(1)%></div>
			</div>
		</div>
				
		<div id='southTotal' class="PositionZongFenLie">
			<%=positionTotal[1]%>
		</div>
		
		<div id='eastTotal' class="PositionDeFenLie">
			<%=positionTotal[0]%>
		</div>
				
		<div class="PositionJiFenLie">
			<!-- input class="inputJiFen" id='southScore' type='text' / -->
			<a href='#' onClick='addScoreDialog.show("south")' style="color: black;">我胡了</a>
		</div>
				
	</div>
		
	<div class="PositionHang1">
			
		<div class="PositionWeiZhiLie" onClick='<%=tempEntryActions[2]%>'>
			<%=posDisp[2]%><!--西-->
		</div>
				
		<div class="PositionWanJiaLie">
			<div class='row' onClick="gameAction.joinGameAtPos('<%=gameId%>','<%=positions[2]%>')" >                 
				<img class="Playerimg" id='<%=positions[2]+"_"+gameId%>' class='icon' src='<%=view.getPlayerImageUrl(2)%>' >
				<div class="PlayerName" id='<%=positions[2]+"_"+gameId+"_PlayerName"%>'><%=view.getPlayerDesc(2)%></div>
			</div>
		</div>
				
		<div id='westTotal' class="PositionZongFenLie">
			<%=positionTotal[2]%>
		</div>

		<div id='eastTotal' class="PositionDeFenLie">
			<%=positionTotal[0]%>
		</div>
		
		<div class="PositionJiFenLie">
			<!-- input class="inputJiFen" id='westScore' type='text' / -->
			<a href='#' onClick='addScoreDialog.show("west")' style="color: black;">我胡了</a>
		</div>
				
	</div>
			
	<div class="PositionHang1">
			
		<div class="PositionWeiZhiLie" onClick='<%=tempEntryActions[3]%>'>
			<%=posDisp[3]%><!--北-->
		</div>
				
		<div class="PositionWanJiaLie">
			<div class='row' onClick="gameAction.joinGameAtPos('<%=gameId%>','<%=positions[3]%>')" >                 
				<img class="Playerimg" id='<%=positions[3]+"_"+gameId%>' class='icon' src='<%=view.getPlayerImageUrl(3)%>' >
				<div class="PlayerName" id='<%=positions[3]+"_"+gameId+"_PlayerName"%>'><%=view.getPlayerDesc(3)%></div>
			</div>
		</div>
				
		<div id='northTotal' class="PositionZongFenLie">
			<%=positionTotal[3]%>
		</div>

		<div id='eastTotal' class="PositionDeFenLie">
			<%=positionTotal[0]%>
		</div>
		
		<div class="PositionJiFenLie">
			<!-- input class="inputJiFen" id='northScore' type='text'/ -->
			<a href='#' onClick='addScoreDialog.show("north")' style="color: black;">我胡了</a>
		</div>
				
	</div>
</div>		
<div class="weui-msg_ZhuXiao" style="height:24%; width:100%;">
    <div class="divbtn1"   >
		<div  style="height:50%; width:100%; ">
			<a href="#" onClick='score.addScore()'class="weui-btn weui-btn_plain-primary" style="height:80%; width:95%;">保存</a>
		</div>
		
		<div style="height:50%; width:100%; ">
			<a href="#" onClick="scoreHist.toggleScoreHist()" class="weui-btn weui-btn_plain-primary" style="height:80%; width:95%;">得分纪录</a>
		</div>
	</div>
</div>
<!-- 输入玩家名称的DIV -->
<div id='tempPlayerEntryDiv' class="weui_dialog_confirm" style="display:none" >
    <div class="weui-mask"></div>
    <div class="weui-dialog">
        <div class="weui-dialog__hd">
			<strong class="weui-dialog__title">
				请输入该位置玩家的名称:
			</strong></div>
        <div class="weui-dialog__bd">
			<input type="text"  type="text" placeholder="玩家姓名如:张三" size="22"  id="TempPlayerName" style="height:30px;" />
		</div>
        <div class="weui-dialog__ft" style="line-height:35px;">
            <a href="#" class="weui-dialog__btn default" onClick="enterTempPlayer.doOkFunction()"  >确定</a>
			<a href="#" class="weui-dialog__btn default" onClick="enterTempPlayer.doCancelFunction()"  >取消</a>
         </div>
    </div>
</div>
<!-- 输入分数的DIV -->
<div id='<%=addScoreDialogDivId%>' class="weui_dialog_confirm" style="display:none" >
    <div class="weui-mask"></div>
    <div class="weui-dialog">
    <!-- 以下是需要修改的布局 -->
        <div class="weui-dialog__hd" >
            <span id='position' sytle:"font-size: 120%;">
                <!-- 文字由startGame.js的addScoreDialog设置-->
                东的得分
            </span>
		    <span>
			    <input type="text"  type="text" placeholder="100" size="4"  id="winnerScore" style="height:20px;" />
			 </span>
		</div>
		<div>
		    <button onClick='addScoreDialog.winThreeOther()'>赢三家</button>
		</div>
		<div>
		    <div>
                <span id='loser1'> 这里的文字由startGame.js设置 </span><input id='loser1input' size=4 />
            </div>
             <div>
                 <span id='loser2'> 这里的文字由startGame.js设置 </span><input id='loser2input' size=4 />
              </div>
              <div>
                  <span id='loser3'> 这里的文字由startGame.js设置 </span><input id='loser3input' size=4 />
              </div>
		</div>
	<!--结束修改部分 -->
        <div class="weui-dialog__ft" style="line-height:35px;">
            <a href="#" class="weui-dialog__btn default" onClick="addScoreDialog.doOkFunction()"  >确定</a>
			<a href="#" class="weui-dialog__btn default" onClick="addScoreDialog.doCancelFunction()"  >取消</a>
         </div>
    </div>
</div>

