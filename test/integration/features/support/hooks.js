this.BeforeScenario( function(scenario, callback) {

	window.parentCommitteeWindow = window.open("http://localhost:8181/launcher/");	
	//TODO: do signOut;
	setTimeout( callback , 1000);
});

this.AfterScenario( function(scenario, callback) {
	window.parentCommitteeWindow.close();
	callback();
});