this.BeforeScenario( function(scenario, callback) {

	window.configWindow = window.open("http://localhost:8181/launcher/");	
	
	var signOut = function(){
		window.configWindow.contextApp.context.Global.session.signOut(function () {
			window.configWindow.location.reload();
			callback();
		});	
	};

	window.testHelpers.waitCondition(function(){
		return window.configWindow.contextApp != null;
	}, signOut);
});



this.AfterScenario( function(scenario, callback) {
	window.configWindow.close();
	callback();
});
