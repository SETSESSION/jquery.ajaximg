<head>
<meta http-equiv="x-ua-compatible" content="ie=7">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>
<div id="test_container" alt="123" style="margin:0 auto;"></div>
<script src="http://code.jquery.com/jquery-1.7.2.min.js"></script>
<script src="jquery.ajaximg.js"></script>
<script>
$(document).ready(function(){
	$("#test_container").ajaximg({
		width:540,
		height:320
	});
});
</script>