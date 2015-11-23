var page = require('webpage').create();
var url = 'http://localhost:8181/test/integration';

page.settings.webSecurityEnabled = false;

console.log('Status: started!');

page.onConsoleMessage = function(msg) {
	console.log('CONSOLE: ' + msg);
	if(msg === "Tests finished!"){
		setTimeout(function() {
			mainFunc();
		}, 2000);
	}
};

page.onPageCreated = function(newPage) {
	console.log('A new child page was created!');
	newPage.onClosing = function(closingPage) {
  		console.log('A child page is closing: ' + closingPage.url);
	};
	newPage.onConsoleMessage = function(msg) {
		console.log('CONSOLE: ' + msg);
	};
	newPage.onLoadFinished = function(){
		console.log('New child page url:' + newPage.url);
    };
};

var mainFunc = function(){
	
	page.evaluate(function(){
		
		var ScenarioStarted = function(msg){
			console.log("##teamcity[testSuiteStarted name='" + msg + "']");
		}
		
		var ScenarioFinished = function(msg){
			console.log("##teamcity[testSuiteFinished name='" + msg + "']");
		}
		
		var StepStarted = function(msg){
			console.log("##teamcity[testStarted name='" + msg + "']");
		}
		
		var StepPassed = function(msg){
			console.log("##teamcity[testFinished name='" + msg + "']");
		}
		
		var StepFailed = function(msg, error){
			console.log("##teamcity[testFailed name='" + msg + "' details='" + error + "']");
		}
		
		var StepSkipped = function(msg){
			console.log("##teamcity[testIgnored name='" + msg + "']");
		}
		
		var testResult = document.getElementById('test-result');
		var features = testResult.getElementsByClassName('blockelement feature');
		
		for(var i = 0;i < features.length;i++){
			
			var feature = features.item(i);
			var scenarious = feature.getElementsByClassName('blockelement scenario');
			
			for(var j = 0;j < scenarious.length;j++){
				
				var scenario = scenarious.item(j);
				ScenarioStarted(scenario.getElementsByClassName('name').item(0).innerHTML);
				var steps = scenario.getElementsByClassName('step');
				
				for(var a = 0;a < steps.length;a++){
					
					var step = steps.item(a);
					var stepStatus = step.className.split(' ')[1];
					var stepName = step.getElementsByClassName('keyword').item(0).innerHTML + step.getElementsByClassName('name').item(0).innerHTML;
					var error = step.getElementsByClassName('error');
					StepStarted(stepName);
					switch(stepStatus){
						case "passed":
							StepPassed(stepName);
							break;
						case "failed":
							StepFailed(stepName, error.length > 0 ? error.item(0).innerHTML.trim().replace(/\n/g, "") : "No message!");
							break;
						case "skipped":
							StepSkipped(stepName);
							break;
					}
				}
				ScenarioFinished(scenario.getElementsByClassName('name').item(0).innerHTML);
			}
		}
		return 0;
	});
	
	phantom.exit();
	
}

page.clearMemoryCache();

page.open(url, function (status) {
	
	if(status === 'success'){
		console.log('Status: openned!');
	}else{
		console.log('Status: something went wrong!');
		phantom.exit();
	}
});