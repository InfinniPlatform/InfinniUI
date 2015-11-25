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
		  window.cucumberCurrentFeature = feature.getName();
		  formatter.feature({
			keyword     : feature.getKeyword(),
			name        : feature.getName(),
			line        : feature.getLine(),
			description : feature.getDescription()
		  });
		  console.log("##teamcity[testSuiteStarted name='" + window.cucumberCurrentFeature + "']");
		  break;

		case 'BeforeScenario':
		  var scenario = event.getPayloadItem('scenario');
		  window.cucumberCurrentScenario = scenario.getName();
		  formatter.scenario({
			keyword     : scenario.getKeyword(),
			name        : scenario.getName(),
			line        : scenario.getLine(),
			description : scenario.getDescription()
		  });
		  console.log("##teamcity[testSuiteStarted name='" + window.cucumberCurrentScenario + "']");
		  break;

		case 'BeforeStep':
		  var step = event.getPayloadItem('step');
		  self.handleAnyStep(step);
		  window.cucumberCurrentStep = (step.getKeyword() + step.getName())
		  .toString()
		  .replace(/'/g, "|'")
		  .replace(/\[/g, "|[")
		  .replace(/\]/g, "|]")
		  .replace(/:/g, "");
		  console.log("##teamcity[testStarted name='" + window.cucumberCurrentStep + "']");
		  break;

		case 'StepResult':
		var teamcityOutput = "##teamcity[";
		  var result;
		  var stepResult = event.getPayloadItem('stepResult');
		  if (stepResult.isSuccessful()) {
			result = {status: 'passed'};
		  } else if (stepResult.isPending()) {
			result = {status: 'pending'};
		  } else if (stepResult.isUndefined() || stepResult.isSkipped()) {
			result = {status:'skipped'};
			teamcityOutput += "testIgnored name='" + window.cucumberCurrentStep + "'";
		  } else {
			var error = stepResult.getFailureException();
			var errorMessage = error.stack || error;
			result = {status: 'failed', error_message: errorMessage};
			teamcityOutput += "testFailed name='" + window.cucumberCurrentStep + "' details='" + errorMessage.toString().replace(/\n/g, "|n|r") + "'";
		  }
		  formatter.match({uri:'report.feature', step: {line: currentStep.getLine()}});
		  formatter.result(result);
		  teamcityOutput += "]";
		  if(teamcityOutput != "##teamcity[]"){
			  console.log(teamcityOutput);
		  }
		  break;
		  
		  case 'AfterStep':
			console.log("##teamcity[testFinished name='" + window.cucumberCurrentStep + "']");
		  break;
		  
		  case 'AfterScenario':
			console.log("##teamcity[testSuiteFinished name='" + window.cucumberCurrentScenario + "']");
		  break;

		  case 'AfterFeature':
		  	console.log("##teamcity[testSuiteFinished name='" + window.cucumberCurrentFeature + "']");
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