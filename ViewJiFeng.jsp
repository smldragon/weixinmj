<%@ page language="java" contentType="text/html; charset=utf-8"  %>
<%@ include file="import_inc.jsp" %>

	 
<div>	 
	<h3 style="text-align:center">得分历史</h3> 
				 	  
	<table id="scores" style="width:100%" >
		<thead>
		
			<tr>
				<td class='ScoreRowHeader'>牌局</td>	
				<td class='ScorePosition1'>
					<div id='<%=positions[0]+"PlayerName"%>'><%=view.getPlayerDesc(0)%></div>
				</td> <!--玩家名0-->
				<td class='ScorePosition2'>
					<div id='<%=positions[1]+"PlayerName"%>'><%=view.getPlayerDesc(1)%></div>
				</td> <!--玩家名1-->
				<td class='ScorePosition1'>
					<div id='<%=positions[2]+"PlayerName"%>'><%=view.getPlayerDesc(2)%></div>
				</td> <!--玩家名2-->
				<td class='ScorePosition2'>
					<div id='<%=positions[3]+"PlayerName"%>'><%=view.getPlayerDesc(3)%></div>
				</td> <!--玩家名3-->
			</tr>
		</thead>		
					
		<tbody>
		<%
			int scoreLength = view.getScoreLength();
			for(int rowIndex=0;rowIndex<scoreLength;rowIndex++) {
				int [] scores = view.getScores(rowIndex);
		%>
				<tr id='<%=scores[0]%>' class='dataRow'>
					<td class='ScoreRowHeader'><%=rowIndex+1%></td>
					<td class='ScorePosition1'><%=scores[1]%></td>
					<td class='ScorePosition2'><%=scores[2]%></td>
					<td class='ScorePosition1'><%=scores[3]%></td>
					<td class='ScorePosition2'><%=scores[4]%></td>
				</tr>
			
		<%
			}
		%>
		</tbody>
			
	</table>

	<div class="weui-msg">
    <div class="weui-msg__opr-area">
        <a href="#" onClick="scoreHist.toggleScoreHist()" class="weui-btn weui-btn_primary">返回</a>
    </div>
</div>
</div>