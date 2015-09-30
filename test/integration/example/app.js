function runIntegrat(){
	var supportCode, 
		xhr = new XMLHttpRequest();
		 
	xhr.open('GET', 'features/feature.feature', false);
	xhr.send();
	if(xhr.status != 200)
		return;
		
	var featureSource = '# language: ru\n' + xhr.responseText;
	
	xhr.open('GET', 'features/step_definitions.js', false);
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
		debugger;
	};
};


function CucumberHTMLListener($root) {
	var formatter = new CucumberHTML.DOMFormatter($root);

	formatter.uri('report.feature');

	var currentStep;

	var self = {
	  hear: function hear(event, callback) {
		var eventName = event.getName();
		switch (eventName) {
		case 'BeforeFeature':
		  var feature = event.getPayloadItem('feature');
		  formatter.feature({
			keyword     : feature.getKeyword(),
			name        : feature.getName(),
			line        : feature.getLine(),
			description : feature.getDescription()
		  });
		  break;

		case 'BeforeScenario':
		  var scenario = event.getPayloadItem('scenario');
		  formatter.scenario({
			keyword     : scenario.getKeyword(),
			name        : scenario.getName(),
			line        : scenario.getLine(),
			description : scenario.getDescription()
		  });
		  break;

		case 'BeforeStep':
		  var step = event.getPayloadItem('step');
		  self.handleAnyStep(step);
		  break;

		case 'StepResult':
		  var result;
		  var stepResult = event.getPayloadItem('stepResult');
		  if (stepResult.isSuccessful()) {
			result = {status: 'passed'};
		  } else if (stepResult.isPending()) {
			result = {status: 'pending'};
		  } else if (stepResult.isUndefined() || stepResult.isSkipped()) {
			result = {status:'skipped'};
		  } else {
			var error = stepResult.getFailureException();
			var errorMessage = error.stack || error;
			result = {status: 'failed', error_message: errorMessage};
		  }
		  formatter.match({uri:'report.feature', step: {line: currentStep.getLine()}});
		  formatter.result(result);
		  break;
		}
		callback();
	  },

	  handleAnyStep: function handleAnyStep(step) {
		formatter.step({
		  keyword: step.getKeyword(),
		  name   : step.getName(),
		  line   : step.getLine(),
		});
		currentStep = step;
	  }
	};
	return self;
};