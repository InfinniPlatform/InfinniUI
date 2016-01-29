var tsm = {
    suiteStarted: function(suiteName){
        console.log("##teamcity[testSuiteStarted name='%s']", suiteName);
    },
    
    suiteFinished: function(suiteName){
        console.log("##teamcity[testSuiteFinished name='%s']", suiteName);
    },
    
    testStarted: function(testName){
        console.log("##teamcity[testStarted name='%s']", testName);
    },
    
    testFinished: function(testName){
        console.log("##teamcity[testFinished name='%s']", testName);
    },
    
    testFailed: function(testName, errorMesage, stackTrace){
        console.log("##teamcity[testFailed name='%s' message='%s' details='%s']", testName, errorMesage, stackTrace);
    },
    
    testIgnored: function(testName){
        console.log("##teamcity[testIgnored name='%s']", testName);
    }
};