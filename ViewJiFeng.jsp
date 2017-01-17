<%@ page language="java" contentType="text/html; charset=utf-8"  %>
<%@ include file="import_inc.jsp" %>

<%
    final String altBckColor = "#F7F7F7";
	final String titleColorStyle="background-color:#EEEEEE;";  //标题颜色
	final String altBckColorStyle="background-color:"+altBckColor+";"; //得分行的另一种颜色
%>
<script>
    score.setScoreTableRowAltBckClr('<%=altBckColor%>');
    score.setScoreTableRowBckClr('');
</script>
<div>
	<h3 style="text-align:center">得分历史</h3>

	<table id="scores" style="width:100%" >
		<thead style="<%=titleColorStyle%>">

			<tr>
				<td class='ScoreRowHeader' style="<%=titleColorStyle%>">牌局</td>
				<td class='ScorePosition1' style="<%=titleColorStyle%>">
					<div id='<%=positions[0]+"PlayerName"%>'><%=view.getPlayerDesc(0)%></div>
				</td> <!--玩家名0-->
				<td class='ScorePosition2' style="<%=titleColorStyle%>">
					<div id='<%=positions[1]+"PlayerName"%>'><%=view.getPlayerDesc(1)%></div>
				</td> <!--玩家名1-->
				<td class='ScorePosition1' style="<%=titleColorStyle%>">
					<div id='<%=positions[2]+"PlayerName"%>'><%=view.getPlayerDesc(2)%></div>
				</td> <!--玩家名2-->
				<td class='ScorePosition2' style="<%=titleColorStyle%>">
					<div id='<%=positions[3]+"PlayerName"%>'><%=view.getPlayerDesc(3)%></div>
				</td> <!--玩家名3-->
			</tr>
		</thead>

		<tbody>
		<%

			int scoreLength = view.getScoreLength();
			for(int rowIndex=0;rowIndex<scoreLength;rowIndex++) {
				int [] scores = view.getScores(rowIndex);
				String bckClrStyle;
				if ( rowIndex %2 == 0) {
					bckClrStyle = "";
				} else {
					bckClrStyle = "style='"+altBckColorStyle+"'";
				}
		%>
				<tr id='<%=scores[0]%>' class='dataRow' <%=bckClrStyle%> >
					<td class='ScoreRowHeader' <%=bckClrStyle%>><%=rowIndex+1%></td>
					<td class='ScorePosition1' <%=bckClrStyle%>><%=scores[1]%></td>
					<td class='ScorePosition2' <%=bckClrStyle%>><%=scores[2]%></td>
					<td class='ScorePosition1' <%=bckClrStyle%>><%=scores[3]%></td>
					<td class='ScorePosition2' <%=bckClrStyle%>><%=scores[4]%></td>
				</tr>
			
		<%
			}
		%>
		</tbody>
			
	</table>

	<div class="weui-msg">
    <div class="weui-msg__opr-area">
        <a href="#" onClick="score.refreshScore()" class="weui-btn weui-btn_primary">刷新</a>
        <a href="#" onClick="scoreHist.toggleScoreHist()" class="weui-btn weui-btn_primary">返回</a>
    </div>
</div>
</div>