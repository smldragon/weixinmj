<div id="scores" style="width:100%" >
			
	<div class="RowHeader">
				
		<h2 style="text-align:center; height:60%; width:100%;">
			第&nbsp;1&nbsp;局
		</h2>
			
		<div class="Position8"  >
			位置
		</div>
				
		<div class="Position8"  >
			玩家
		</div>
				
		<div class="Position8"  >
			总分
		</div>
				
		<div class="Position8"  >
			记分
		</div>
				
	</div>
			
	<div class="Position1">
			
		<div class="Position2">
			<%=posDisp[0]%><!--东-->
		</div>

		<div class="Position3">
			<div class='row' onClick="gameAction.joinGameAtPos('<%=gameId%>','<%=positions[0]%>')" >                 
				<img class="Playerimg" id='<%=positions[0]+"_"+gameId%>' class='icon' src='<%=view.getPlayerImageUrl(0)%>' >
				<div class="PlayerName" id='<%=positions[0]+"_"+gameId+"_PlayerName"%>'><%=view.getPlayerDesc(0)%></div>
			</div>
		</div>
					
		<div id='eastTotal' class="Position4">
			<%=positionTotal[0]%>
		</div>
				
		<div class="Position6">
			<input class="inputJiFen" id='eastScore' type='text' />
		</div>
				
	</div>
			
	<div class="Position1">
			
		<div class="Position2">
			<%=posDisp[1]%><!--南-->
		</div>
					
		<div class="Position3">
			<div class='row' onClick="gameAction.joinGameAtPos('<%=gameId%>','<%=positions[1]%>')" >                 
				<img class="Playerimg" id='<%=positions[1]+"_"+gameId%>' class='icon' src='<%=view.getPlayerImageUrl(1)%>' >
				<div class="PlayerName" id='<%=positions[1]+"_"+gameId+"_PlayerName"%>'><%=view.getPlayerDesc(1)%></div>
			</div>
		</div>
				
		<div id='southTotal' class="Position4">
			<%=positionTotal[1]%>
		</div>
				
		<div class="Position6">
			<input class="inputJiFen" id='southScore' type='text' />
		</div>
				
	</div>
		
	<div class="Position1">
			
		<div class="Position2">
			<%=posDisp[2]%><!--西-->
		</div>
				
		<div class="Position3">
			<div class='row' onClick="gameAction.joinGameAtPos('<%=gameId%>','<%=positions[2]%>')" >                 
				<img class="Playerimg" id='<%=positions[2]+"_"+gameId%>' class='icon' src='<%=view.getPlayerImageUrl(2)%>' >
				<div class="PlayerName" id='<%=positions[2]+"_"+gameId+"_PlayerName"%>'><%=view.getPlayerDesc(2)%></div>
			</div>
		</div>
				
		<div id='westTotal' class="Position4">
			<%=positionTotal[2]%>
		</div>
				
		<div class="Position6">
			<input class="inputJiFen" id='westScore' type='text' />
		</div>
				
	</div>
			
	<div class="Position1">
			
		<div class="Position2">
			<%=posDisp[3]%><!--北-->
		</div>
				
		<div class="Position3">
			<div class='row' onClick="gameAction.joinGameAtPos('<%=gameId%>','<%=positions[3]%>')" >                 
				<img class="Playerimg" id='<%=positions[3]+"_"+gameId%>' class='icon' src='<%=view.getPlayerImageUrl(3)%>' >
				<div class="PlayerName" id='<%=positions[3]+"_"+gameId+"_PlayerName"%>'><%=view.getPlayerDesc(3)%></div>
			</div>
		</div>
				
		<div id='northTotal' class="Position4">
			<%=positionTotal[3]%>
		</div>
				
		<div class="Position6">
			<input class="inputJiFen" id='northScore' type='text'/>
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
	
