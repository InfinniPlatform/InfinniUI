function teamCityFormatter() {
    this.registerHandler("BeforeFeature", handleBeforeFeature);
    this.registerHandler("AfterFeature", handleAfterFeature);
    this.registerHandler("BeforeScenario", handleBeforeScenario);
    this.registerHandler("AfterScenario", handleAfterScenario);
    this.registerHandler("StepResult", handleStepResult);
}

module.exports = teamCityFormatter;

var currentScenario;

function handleStepResult(event, callback) {
    var stepResult = event.getPayloadItem("stepResult");
    var step = stepResult.getStep();

    fixStepResult(stepResult);

    var error = !stepResult.isSuccessful() && !stepResult.isPending() && !stepResult.isSkipped() && !stepResult.isUndefined();

    if (error) {
        var failureMessage = stepResult.getFailureException();
        if (failureMessage) {
            process.stderr.write("##teamcity[testFailed name='" + currentScenario +
                "' details='" + escape(failureMessage.stack || failureMessage) + "']\n");
        }
        return callback();
    }

    callback();
}

function handleBeforeFeature(event, callback) {
    var feature = event.getPayloadItem("feature");
    process.stderr.write("##teamcity[testSuiteStarted name='" + escape(feature.getName()) + "']\n");
    callback();
}

function handleAfterFeature(event, callback) {
    var feature = event.getPayloadItem("feature");
    process.stdout.write("##teamcity[testSuiteFinished name='" + escape(feature.getName()) + "']\n");
    callback();
}

function handleBeforeScenario(event, callback) {
    var scenario = event.getPayloadItem("scenario");
    process.stderr.write("##teamcity[testStarted name='" + escape(scenario.getName()) + "' captureStandardOutput='true']\n");
    currentScenario = escape(scenario.getName());
    callback();
}

function handleAfterScenario(event, callback) {
    var scenario = event.getPayloadItem("scenario");
    process.stderr.write("##teamcity[testFinished name='" + escape(scenario.getName()) + "']\n");
    callback();
}

//according to: https://confluence.jetbrains.com/display/TCD7/Build+Script+Interaction+with+TeamCity
function escape(string) {
    return string
        .replace(/\|/g, '||')
        .replace(/'/g, "|'")
        .replace(/\n/g, '|n')
        .replace(/\r/g, '|r')
        .replace(/\[/g, '|[')
        .replace(/\]/g, '|]');
}

function fixStepResult(step) {
    step.isPending = function () {
        return this.getStatus() == 'pending';
    };
    step.isSkipped = function () {
        return this.getStatus() == 'skipped';
    };
    step.isUndefined = function () {
        return this.getStatus() == 'undefined';
    };
    step.isFailed = function () {
        return this.getStatus() == 'failed';
    };
    step.isSuccessful = function () {
        return this.getStatus() == 'successful';
    };
}