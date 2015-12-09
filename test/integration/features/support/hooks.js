
this.BeforeScenario( function(scenario, callback) {
	var snapshotPath = window.navigator.platform.indexOf('Linux') == -1 ? "C:\\ESbackups" : "/tmp/ESbackups"
	
	console.log('Before scenario');
		//delete indices, create repository and restore
		client.indices.delete({
			"index": "administrationcustomization,authorization,pta",
			"waitForCompletion": true
		}).then(function(){
			client.snapshot.createRepository({
				"repository": "my_backup",
				"body":{
					"type": "fs",
					"settings": {
						"compress": "true",
						"location": snapshotPath
					}
				}
			}).then(function(){
				client.snapshot.restore({
					"repository": "my_backup",
					"snapshot": "snapshot1",
					"waitForCompletion": true
				}).then(function(){
					window.configWindow = window.open(window.IntegrationTestConfig.host);	
	
					var signOut = function(){
						window.configWindow.contextApp.context.Global.session.signOut(function () {
							window.configWindow.location.reload();
							callback();
						});	
					};
					
					var error = function(){
						console.log('signOut not called!');
					}
				
					window.testHelpers.waitCondition(function(){
						return window.configWindow.contextApp != null;
					}, signOut, error);
				});	
			});
		});
});

this.AfterFeatures(function(){
	console.log("Tests finished!");
});

this.AfterScenario( function(scenario, callback) {
	window.configWindow.close();
	callback();
});

this.AfterStep(function(step, callback){
	setTimeout(function() {
		callback();
	}, 200);
});
