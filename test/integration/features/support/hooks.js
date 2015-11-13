
this.BeforeScenario( function(scenario, callback) {
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
						"location": "C:\\ESbackups"
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
				
					window.testHelpers.waitCondition(function(){
						return window.configWindow.contextApp != null;
					}, signOut);
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
