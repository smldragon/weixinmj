<div class="RowHeadertable" style="height:8%;width:100%; ">

<div class="RowHeadertable" style="height:8%;width:100%; background:url(/weixinmj/icon/RowHeadertable.jpg);background-repeat:repeat;  position: absolute; left: 0%; top: -0.1%; ">

    <% if ( isHost ) { %>
		<div class="column" style="height:100%;width:15%;float:left;" >
			<nav id="topNav" style="width:100%;height:100%;">
				<ul style="width:100%;height:100%;">
					<li style="width:100%;height:100%;">
						<a href="#" title="更多菜单" style="line-height:250%;">
							&nbsp;&nbsp;&#9776;
						</a>
						<ul class="last"  style="background:url(/weixinmj/icon/RowHeadertable.jpg) repeat 0px center;">
							<li class="last" >
								<a href="#" title="ScoreConfig"onClick="showScoreConfigModifier('game',scoreConfig.getGameScoreConfig())">
									计分方法
								</a>
							</li>
							
							<li class="last" >
								<a href="#" title="ScoreConfig"onClick="">
									关于
								</a>
							</li>	
							
						</ul>
					</li>
				</ul>
			</nav>
		</div>
	<% } %>
		<div id="pageTitle" class="column" style="height:100%;width:70%;text-align:center;float:left;font-size:100%;font-weight: 600;color:white;line-height:130%;">
			<div id="pageTitle1" style="height:50%;width:100%;">
			</div>
			<div id="pageTitle2" style="height:50%;width:100%;">
			</div>
		</div>
		
		<div class="column" style="height:100%;width:15%;text-align:right;float:left;font-size:70%;line-height:350%;font-weight:600;" >
			<a href='#' title='退出本局' onClick="exitGame.requestExit()" style="color:white;" >
				退出&nbsp;
			</a>
		</div>
</div>
		
</div>