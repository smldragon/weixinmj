<%@ page language='java'  %>
<%@ include file="/weixinmj/import_inc.jsp" %>

<%
	
%>
 
<script>

	var array = [0,0,0,0];
	
	var testModule = function () {
		
		var config = "b";
		var array_local = array;
		
		var arr = new Array();
		arr[0]='abc';
		arr[1]='123';
		arr[100]="I am 100";
		
		return {
			func: eval("function_"+config),
			printArrAt: function(index) {
				console.log("element "+index+"="+arr[index]+" array_local[0]="+array_local[0]);
			}
		}
		
		function function_a() {
			console.log("this is a");
		};
		
		function function_b() {
			console.log("this is b");
		};
 
	}();
 
	testModule.func();
	
	testModule.printArrAt(100);
	array[0]=1;
	
	
	
	testModule.printArrAt(100);
	

</script>


