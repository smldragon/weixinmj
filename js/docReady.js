$(document).ready(function() {
	
	$("#testButton").click(function(){
		$.ajax({
			url: "http://mjoosbt.ddns.net/wxmj?timestamp=1462116203&nonce=2111577250&signature=cc019d848cda9cd9ccd27d3b00c960728aca946f&echostr=580920519105167345&action=TestMj", 
			async: true, 
			success: function(result){
				$xml = $( result ),
				$title = $xml.find( "Title" );
				$("#demo").html('Success: <br>'+$title.text());
			},
			error: function(xhr, error){
				$("#demo").html('Error:<br>'+xhr.statusText);
			}
		})
	  });

	
	 
});
