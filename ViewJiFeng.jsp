<%@ page language="java" contentType="text/html; charset=utf-8"  %>
<%@ include file="import_inc.jsp" %>

<%
    final String altBckColor = "#f2f2f2"; //双数行行背景颜色
    final String winnerClr = "#88ff88";
    final String winnerClrStyle="style='background-color:"+winnerClr+"';";
	final String titleColorStyle="background-color:#EEEEEE;";  //标题颜色
	final String totalCellStyle="color:#E6421A; font-weight: bold;";  //总分字体颜色
	final String altBckColorStyle="background-color:"+altBckColor+";"; //得分行的另一种颜色
%>
<script>
    score.setScoreTableRowAltBckClr('<%=altBckColor%>');
    score.setScoreTableRowBckClr('');
    score.setWinnerClr('<%=winnerClr%>');
</script>
<div style="height:100%;width:100%;">
	<div style="height:8%;width:100%; background:url(/weixinmj/icon/RowHeadertable.jpg);background-repeat:repeat;  position: absolute; left: 0%; top: -0.1%; ">
		<div  style="height:100%;width:15%;text-align:center;float:left;font-size:110%;line-height:320%;font-weight:500;">
			<a href="#" title="返回" onClick="scoreHist.toggleScoreHist()" style="color:white;">
				&#60;返回
			</a>
		</div>
		
		<div style="height:100%;width:70%;text-align:center;float:left;font-size:150%;line-height:250%;font-weight:600;color:white;color:white;">
			得分表
		</div>
		
		<div  style="height:100%;width:15%;text-align:right;float:left;font-size:110%;line-height:320%;font-weight:500;" >
			<a href='#' title='刷新' onClick="score.refreshScore()" style="color:white;" >
				刷新&nbsp;
			</a>
		</div>
		
	</div>
	
	<div style="height:92%;width:100%;position:relative;top:8%;">
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
			<tr style="background-color:#f2f2f2 !important;">
            	<td class='ScoreRowHeader' style="<%=totalCellStyle%>;background-color:#22DDB8;">总分</td>
            	<td class='ScorePosition1' style="<%=totalCellStyle%>;background-color:#22DDB8;">
            		<div id='<%=positions[0]+"PlayerNameTotal"%>'><%=view.getPositionTotal()[0]%></div>
            	</td> <!--玩家0总分-->
            	<td class='ScorePosition2' style="<%=totalCellStyle%>;background-color:#22DDB8;">
            		<div id='<%=positions[1]+"PlayerNameTotal"%>'><%=view.getPositionTotal()[1]%></div>
            	</td> <!--玩家1总分-->
            	<td class='ScorePosition1' style="<%=totalCellStyle%>;background-color:#22DDB8;">
            		<div id='<%=positions[2]+"PlayerNameTotal"%>'><%=view.getPositionTotal()[2]%></div>
            	</td> <!--玩家2总分-->
            	<td class='ScorePosition2' style="<%=totalCellStyle%>;background-color:#22DDB8;">
            		<div id='<%=positions[3]+"PlayerNameTotal"%>'><%=view.getPositionTotal()[3]%></div>
            	</td> <!--玩家3总分-->
            </tr>
		</thead>

		<tbody>
		<%

			int scoreLength = view.getScoreLength();
			for(int rowIndex=0;rowIndex<scoreLength;rowIndex++) {
				int [] scores = view.getScores(rowIndex);
				String bckClrStyle;
				if ( rowIndex %2 == 1) {
					bckClrStyle = "";
				} else {
					bckClrStyle = "style='"+altBckColorStyle+"'";
				}
				String bckClrStyle0;
				String bckClrStyle1;
				String bckClrStyle2;
				String bckClrStyle3;
				if ( scores[1] > 0) {
				    bckClrStyle0 = winnerClrStyle;
				} else {
				    bckClrStyle0 = bckClrStyle;
				}
				if ( scores[2] > 0) {
                    bckClrStyle1 = winnerClrStyle;
                } else {
                	bckClrStyle1 = bckClrStyle;
                }
                if ( scores[3] > 0) {
                    bckClrStyle2 = winnerClrStyle;
                } else {
                    bckClrStyle2 = bckClrStyle;
                }
                if ( scores[4] > 0) {
                    bckClrStyle3 = winnerClrStyle;
                } else {
                    bckClrStyle3 = bckClrStyle;
                }
		%>
				<tr id='<%=scores[0]%>' class='dataRow' <%=bckClrStyle%> >
					<td class='ScoreRowHeader' <%=bckClrStyle%>><%=rowIndex+1%></td>
					<td class='ScorePosition1' <%=bckClrStyle0%>><%=scores[1]%></td>
					<td class='ScorePosition2' <%=bckClrStyle1%>><%=scores[2]%></td>
					<td class='ScorePosition1' <%=bckClrStyle2%>><%=scores[3]%></td>
					<td class='ScorePosition2' <%=bckClrStyle3%>><%=scores[4]%></td>
				</tr>
			
		<%
			}
		%>
		</tbody>
			
	</table>
	</div>
	<!--
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
	-->
	
</div>