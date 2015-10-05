this.BeforeScenario( function(scenario, callback) {

	window.configWindow = window.open("http://localhost:8181/launcher/");	

	window.testHelpers.waitCondition(function(){
		return window.configWindow.contextApp != null;
	}, callback);
});



this.AfterScenario( function(scenario, callback) {
	window.configWindow.close();
	callback();
});
