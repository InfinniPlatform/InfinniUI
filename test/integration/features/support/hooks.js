
this.BeforeScenario( function(scenario, callback) {
	var deleteIndiciesPromise = deleteIndicies();

    var createRepositoryPromise = deleteIndiciesPromise.then(createRepository, createRepository);

    var refreshPromise = createRepositoryPromise.then(refresh);

    var restoreIndiciesPromise = refreshPromise.then(restoreIndicies);

    restoreIndiciesPromise.then(function(){
        openHost(callback);
    });
});

this.AfterFeatures(function(){
    if(window.callPhantom){
        window.callPhantom({command: 'Tests finished'});
    }

    if(location.hash === "#enableClosing"){
        window.close();
    }
});

this.AfterScenario( function(scenario, callback) {
	window.configWindow.close();
	callback();
});

this.AfterStep(function(step, callback){
	callback();
});

var openHost = function(callback){
    window.configWindow = window.open(window.IntegrationTestConfig.host);   

    var signOut = function(){
        window.configWindow.contextApp.context.global.session.signOut(function () {
            window.configWindow.location.reload();
            callback();
        }); 
    };
    
    var error = function(){
        console.log('signOut not called!');
    };

    window.testHelpers.waitCondition(function(){
        return window.configWindow.contextApp != null;
    }, signOut, error);
};

var deleteIndicies = function(){
    return client.indices.delete({
        "index": "_all",
        "waitForCompletion": true
    });
};

var createRepository = function(){
    var snapshotPath = window.navigator.platform.indexOf('Linux') == -1 ? "C:\\ESbackups" : "/tmp/ESbackups";
    
    return client.snapshot.createRepository({
        "repository": "my_backup",
        "body":{
            "type": "fs",
            "settings": {
                "compress": "true",
                "location": snapshotPath
            }
        }
    });
};

var restoreIndicies = function(){
    return client.snapshot.restore({
        "repository": "my_backup",
        "snapshot": "snapshot1",
        "waitForCompletion": true
    });
};

var refresh = function(){
    return client.indices.refresh();
}