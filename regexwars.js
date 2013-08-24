requirejs(['controls/stage/stage', 'mustache!init'], function(StageControl, initView){
	$('#content').html(initView());
	new StageControl('#stage')
});