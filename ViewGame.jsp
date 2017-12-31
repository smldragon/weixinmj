<%
    /**
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
    */
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
			
		<div class="PositionTouLie"  style="width:20%;">
			位置
		</div>
				
		<div class="PositionTouLie"  style="width:20%;">
			玩家
		</div>
				
		<div class="PositionTouLie"  style="width:30%;">
			总分
		</div>
		
		<!-- div class="PositionTouLie"  style="width:20%;">
		    //by new score recording, positionTotal = positionNet -- 2017-01-14, see score.js line 72
			净赢分
		</div -->
		
		<div class="PositionTouLie"  style="width:30%;">
			去算分
		</div>
				
	</div>
			
	<div class="PositionHang1">
			
		<div class="PositionWeiZhiLie" >
			<%=posDisp[0]%><!--东-->
		</div>

		<div class="PositionWanJiaLie">
			<div class='row' onClick="gameAction.joinGameAtPos('<%=positions[0]%>')" >
				<img class="Playerimg" id='<%=positions[0]+"_"+gameId%>' class='icon' src='<%=view.getPlayerImageUrl(0)%>' >
				<div class="PlayerName" id='<%=positions[0]+"_"+gameId+"_PlayerName"%>'><%=view.getPlayerDesc(0)%></div>
			</div>
		</div>
					
		<div id='eastTotal' class="PositionZongFenLie">
			<%=positionTotal[0]%>
		</div>
		<!-- div id='eastTotalNet' class="PositionDeFenLie">

		</div -->
				
		<div class="PositionJiFenLie">
			<!-- input class="inputJiFen" id='eastScore' type='text' / -->
			<a id='eastWin0' class="weui-btn weui-btn_plain-primary" href='#' onClick='addScoreDialog.show("east",0)' style="height:30%; width:80%; margin-top:12%; font-size:90%;">胡了</a>
			<a id='eastWin1' class="weui-btn weui-btn_plain-primary" href='#' onClick='addScoreDialog.show("east",1)' style="height:30%; width:80%; margin-top:12%; font-size:90%;"">自摸</a>
		</div>
	</div>
	<div class="PositionHang1">
		<div class="PositionWeiZhiLie" >
			<%=posDisp[1]%><!--南-->
		</div>
		<div class="PositionWanJiaLie">
			<div class='row' onClick="gameAction.joinGameAtPos('<%=positions[1]%>')" >
				<img class="Playerimg" id='<%=positions[1]+"_"+gameId%>' class='icon' src='<%=view.getPlayerImageUrl(1)%>' >
				<div class="PlayerName" id='<%=positions[1]+"_"+gameId+"_PlayerName"%>'><%=view.getPlayerDesc(1)%></div>
			</div>
		</div>
				
		<div id='southTotal' class="PositionZongFenLie">
			<%=positionTotal[1]%>
		</div>
		<!-- div id='southTotalNet' class="PositionDeFenLie">
		</div -->
		<div class="PositionJiFenLie">
			<!-- input class="inputJiFen" id='southScore' type='text' / -->
			<a id='southWin0' class="weui-btn weui-btn_plain-primary" href='#' onClick='addScoreDialog.show("south",0)' style="height:30%; width:80%; margin-top:12%; font-size:90%;">胡了</a>
			<a id='southWin1' class="weui-btn weui-btn_plain-primary" href='#' onClick='addScoreDialog.show("south",1)' style="height:30%; width:80%; margin-top:12%; font-size:90%;">自摸</a>
		</div>
	</div>
	<div class="PositionHang1">
		<div class="PositionWeiZhiLie">
			<%=posDisp[2]%><!--西-->
		</div>
		<div class="PositionWanJiaLie">
			<div class='row' onClick="gameAction.joinGameAtPos('<%=positions[2]%>')" >
				<img class="Playerimg" id='<%=positions[2]+"_"+gameId%>' class='icon' src='<%=view.getPlayerImageUrl(2)%>' >
				<div class="PlayerName" id='<%=positions[2]+"_"+gameId+"_PlayerName"%>'><%=view.getPlayerDesc(2)%></div>
			</div>
		</div>
		<div id='westTotal' class="PositionZongFenLie">
			<%=positionTotal[2]%>
		</div>
		<!-- div id='westTotalNet' class="PositionDeFenLie">
		</div -->
		<div class="PositionJiFenLie">
			<!-- input class="inputJiFen" id='westScore' type='text' / -->
			<a id='westWin0' class="weui-btn weui-btn_plain-primary" href='#' onClick='addScoreDialog.show("west",0)' style="height:30%; width:80%; margin-top:12%; font-size:90%;">胡了</a>
			<a id='westWin1' class="weui-btn weui-btn_plain-primary" href='#' onClick='addScoreDialog.show("west",1)' style="height:30%; width:80%; margin-top:12%; font-size:90%;">自摸</a>
		</div>
	</div>
	<div class="PositionHang1">
		<div class="PositionWeiZhiLie" >
			<%=posDisp[3]%><!--北-->
		</div>
		<div class="PositionWanJiaLie">
			<div class='row' onClick="gameAction.joinGameAtPos('<%=positions[3]%>')" >
				<img class="Playerimg" id='<%=positions[3]+"_"+gameId%>' class='icon' src='<%=view.getPlayerImageUrl(3)%>' >
				<div class="PlayerName" id='<%=positions[3]+"_"+gameId+"_PlayerName"%>'><%=view.getPlayerDesc(3)%></div>
			</div>
		</div>
		<div id='northTotal' class="PositionZongFenLie">
			<%=positionTotal[3]%>
		</div>
		<!-- div id='northTotalNet' class="PositionDeFenLie">
		</div -->
		<div class="PositionJiFenLie">
			<!-- input class="inputJiFen" id='northScore' type='text'/ -->
			<a id='northWin0' class="weui-btn weui-btn_plain-primary" href='#' onClick='addScoreDialog.show("north",0)' style="height:30%; width:80%; margin-top:12%; font-size:90%;">胡了</a>
			<a id='northWin1' class="weui-btn weui-btn_plain-primary" href='#' onClick='addScoreDialog.show("north",1)' style="height:30%; width:80%; margin-top:12%; font-size:90%;">自摸</a>
		</div>
	</div>
</div>		
<div class="weui-msg_ZhuXiao" style="height:20%; width:100%;">
    <div class="divbtn1"   >
		<div style="height:100%; width:100%; ">
			<a href="#" onClick="scoreHist.toggleScoreHist()" class="weui-btn weui-btn_plain-primary" style="height:40%; width:95%;margin-top:12%">得分表</a>
		</div>
	</div>
</div>
<!-- 输入玩家名称的DIV -->
<div id='tempPlayerEntryDiv' class="weui_dialog_confirm" style="display:none" >
    <div class="weui-mask"></div>
    <div class="weui-dialog">
        <div class="weui-dialog__hd">
			<strong class="weui-dialog__title">
				请输入该位置玩家名称:
			</strong></div>
        <div class="weui-dialog__bd" style="padding-top:2%;padding-bottom:0%;" >
			<input type="text"  type="text" placeholder="玩家姓名如:张三" size="22"  id="TempPlayerName" style="height:30px;" />
		</div>

		<div  style="padding-top:0%;padding-bottom:3%;"> 
			<a href="#"  id='changePosition' onclick='gameAction.joinGameByHost()' style="font-weight: 400;
			font-size: 18px;">
				或自己换位
			</a>
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
    <div class="weui-dialog"  >
    <!-- 以下是需要修改的布局 -->
		<div style="height:250px;font-size:130%;line-height:190%;" >
			<div  style="height:10%;width:100%;padding-top:8%;">
			    <div style="float:left;width:50%;text-align:left;text-indent:3%;">
            	    胡的分数:
            	</div>
            	<div style="float:left;height:100%;width:50%;">
            		<input type="number" min="0" placeholder=" 请输入分数, 如100 "  id="gameScore"  style="width:90%;height:75%;margin-left:-5%;" oninput="addScoreDialog.onGameScoreInput()"/>
            	</div>
			</div>
			<br>
			<div id = 'winnerScore' style="visibility:hidden" >
                <div id='winnerScorePrompt' style="float:left;width:50%;text-align:left;text-indent:3%;">
                    <!-- 文字由startGame.js的addScoreDialog.show()设置-->
                    东的得分
                </div>
                <div style="float:left;width:50%;">
                    <input type="number" min="0" placeholder=" 请输入分数, 如100 "  id="winnerScoreField" style="width:90%;margin-left:-5%;" />
                </div>
            </div>
            <br>
			<div id='loserScores'style="visibility:hidden">
				<div style="height:18%;width:100%;">
					<div id='loser1' style="float:left;width:50%;text-align:left;text-indent:3%;">
						这里的文字由startGame.js设置
					</div>
					 <%
                        //输入框的宽度由score.js动态决定,不再由style="width:50%"决定
                     %>
					<div id='loser1inputDiv' style="float:left;height:100%;width:25%">
                        <input type="number" min="0" placeholder="请输入分数, 如100"  id='loser1input'  style="height:75%;margin-left:-5%;"/>
					</div>
					<div id='loser1buttonDiv' style="float:left;width:25%">
					    <button id='loser1button' onClick='netScoreFuncConfig.dianPao(1)' style="height:60%;font-size:100%;">包冲</button>
					</div>
				</div>
				<br>
				<div style="height:18%;width:100%;">
					<div id='loser2' style="float:left;width:50%;text-align:left;text-indent:3%;"> 
						这里的文字由startGame.js设置 
					</div>
					<div id='loser2inputDiv' style="float:left;height:100%;width:25%">
						<input type="number" min="0" placeholder="请输入分数, 如100"  id='loser2input'  style="height:75%;margin-left:-5%;"/>
					</div>
					<div id='loser2buttonDiv' style="float:left;width:25%">
                        <button id='loser2button' onClick='netScoreFuncConfig.dianPao(2)' style="height:60%;font-size:100%;">包冲</button>
                    </div>
				 </div >
				 <br>
				 <div style="height:18%;width:100%;">
					<div id='loser3' style="float:left;width:50%;text-align:left;text-indent:3%;">
						这里的文字由startGame.js设置
					</div>
					<div id='loser3inputDiv' style="float:left;height:100%;width:25%">
						<input type="number" min="0" placeholder="请输入分数, 如100"  id='loser3input'  style="height:75%;margin-left:-5%;"/>
					</div>
					<div id='loser3buttonDiv' style="float:left;width:25%">
                        <button id='loser3button' onClick='netScoreFuncConfig.dianPao(3)' style="height:60%;font-size:100%;">包冲</button>
                    </div>
				</div>
				<br>
			</div>
		</div>
		<br>
		<div id='scoreDialogButton' class="weui-dialog__ft" style="width:100%;height:130%; visibility:hidden;">
            <a href="#" class="weui-dialog__btn default" onClick="addScoreDialog.doOkFunction()"  >确定</a>
            <a href="#" class="weui-dialog__btn default" onClick="addScoreDialog.doCancelFunction()"  >取消</a>
        </div>
	<!--结束修改部分 -->
    </div>
</div>

