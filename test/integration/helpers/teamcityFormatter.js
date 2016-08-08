function teamCityFormatter() {
    this.registerHandler("BeforeFeature", handleBeforeFeature);
    this.registerHandler("AfterFeature", handleAfterFeature);
    this.registerHandler("BeforeScenario", handleBeforeScenario);
    this.registerHandler("AfterScenario", handleAfterScenario);
    this.registerHandler("StepResult", handleStepResult);
}

module.exports = teamCityFormatter;

var currentScenario;
var translit = require('translitit-cyrillic-russian-to-latin');

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
    process.stderr.write("##teamcity[testSuiteStarted name='" + escape(getTag(feature) + feature.getName()) + "']\n");
    callback();
}

function handleAfterFeature(event, callback) {
    var feature = event.getPayloadItem("feature");
    process.stdout.write("##teamcity[testSuiteFinished name='" + escape(getTag(feature) + feature.getName()) + "']\n");
    callback();
}

function handleBeforeScenario(event, callback) {
    var scenario = event.getPayloadItem("scenario");
    process.stderr.write("##teamcity[testStarted name='" + escape(getTag(scenario) + scenario.getName()) + "' captureStandardOutput='true']\n");
    currentScenario = escape(getTag(scenario) + scenario.getName());
    callback();
}

function handleAfterScenario(event, callback) {
    var scenario = event.getPayloadItem("scenario");
    process.stderr.write("##teamcity[testFinished name='" + escape(getTag(scenario) + scenario.getName()) + "']\n");
    callback();
}

//according to: https://confluence.jetbrains.com/display/TCD7/Build+Script+Interaction+with+TeamCity
function escape(string) {
    string = string
        .replace(/\|/g, '||')
        .replace(/'/g, "|'")
        .replace(/\n/g, '|n')
        .replace(/\r/g, '|r')
        .replace(/\[/g, '|[')
        .replace(/\]/g, '|]');

    return translit(string);
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

function getTag(item) {
    var tags = item.getTags();

    if (tags.length == 0) {
        return '';
    }

    return tags[0].getName() + ' ';
}