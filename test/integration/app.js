var FEATURE_PATH = 'out/feature.feature';
var STEP_DEFINITIONS_PATH = 'out/step_definitions.js';

function runIntegrat(){
	var supportCode, 
		xhr = new XMLHttpRequest();
		 
	xhr.open('GET', FEATURE_PATH, false);
	xhr.send();
	if(xhr.status != 200)
		return;
		
	var featureSource = '# language: ru\n' + xhr.responseText;
	
	xhr.open('GET', STEP_DEFINITIONS_PATH, false);
	xhr.send();
	if(xhr.status != 200)
		return;
		
	eval('supportCode   = function() {' + xhr.responseText + '};');	
	
	 
	var listener = CucumberHTMLListener($('#test-result'));
	var cucumber = Cucumber(featureSource, supportCode);
	cucumber.attachListener(listener);

	try {
		cucumber.start(function() {});
    } catch(err) {
    	console.log(err);
		$('#test-result').text(err.message);
	};
};