var tsm = {
    suiteStarted: function(suiteName){
        console.log("##teamcity[testSuiteStarted name='" + suiteName + "']")
    },
    
    suiteFinished: function(suiteName){
        console.log("##teamcity[testSuiteFinished name='" + suiteName + "']");
    },
    
    testStarted: function(testName){
        console.log("##teamcity[testStarted name='" + testName + "']");
    },
    
    testFinished: function(testName){
        console.log("##teamcity[testFinished name='" + testName + "']");
    },
    
    testFailed: function(testName, errorMesage){
        console.log("##teamcity[testFailed name='" + testName + "' details='" + errorMesage + "']");
    },
    
    testIgnored: function(testName){
        console.log("##teamcity[testIgnored name='" + testName + "']");
    }
};