<%@ page language="java" contentType="text/html; charset=utf-8"  %>
<%@ include file="import_inc.jsp" %>

<%
	final String titleColorStyle="background-color:#EEEEEE;";  //标题颜色
	final String altBckColorStyle="background-color:#F7F7F7;"; //得分行的另一种颜色
%>

<div>
	<div >
		<div >
			<h3 style="text-align:center">得分历史</h3>
		</div>
		
	</div>
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
					bckClrStyle = altBckColorStyle;
				}
		%>
				<tr id='<%=scores[0]%>' class='dataRow' style="<%=bckClrStyle%>" >
					<td class='ScoreRowHeader' style="<%=bckClrStyle%>"><%=rowIndex+1%></td>
					<td class='ScorePosition1' style="<%=bckClrStyle%>"><%=scores[1]%></td>
					<td class='ScorePosition2' style="<%=bckClrStyle%>"><%=scores[2]%></td>
					<td class='ScorePosition1' style="<%=bckClrStyle%>"><%=scores[3]%></td>
					<td class='ScorePosition2' style="<%=bckClrStyle%>"><%=scores[4]%></td>
				</tr>
			
		<%
			}
		%>
		</tbody>
			
	</table>

	<div class="weui-msg">
    <div class="weui-msg__opr-area" >
		<div style="height:10%;width:100%;">
		<div style="float:left;height:100%;width:50%;">
			<a href="#" onClick="score.refreshScore()" class="weui-btn weui-btn_plain-primary" style="height:70%;width:80%;line-height:35px">刷新</a>
		</div >
		<div style="float:left;height:100%;width:50%;">
        <a href="#" onClick="scoreHist.toggleScoreHist()" class="weui-btn weui-btn_plain-primary" style="height:70%;width:80%;line-height:35px">返回</a>
		</div >
		</div>
    </div>
</div>
</div>