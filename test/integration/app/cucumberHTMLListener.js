function CucumberHTMLListener($root) {
    var formatter = new CucumberHTML.DOMFormatter($root);

    formatter.uri('report.feature');

    var currentStep;

    var self = {
        hear: function hear(event, callback) {
            var eventName = event.getName();
            switch (eventName) {
                case 'BeforeFeature':
                    var feature = event.getPayloadItem('feature');
                    window.cucumberCurrentFeature = feature.getName();
                    formatter.feature({
                        keyword: feature.getKeyword(),
                        name: feature.getName(),
                        line: feature.getLine(),
                        description: feature.getDescription()
                    });
                    tsm.suiteStarted(window.cucumberCurrentFeature);
                    break;

                case 'BeforeScenario':
                    var scenario = event.getPayloadItem('scenario');
                    window.cucumberCurrentScenario = scenario.getName();
                    window.cucumberIsIgnored = false;
                    window.cucumberIsFailed = false;
                    formatter.scenario({
                        keyword: scenario.getKeyword(),
                        name: scenario.getName(),
                        line: scenario.getLine(),
                        description: scenario.getDescription()
                    });
                    tsm.testStarted(window.cucumberCurrentScenario);
                    break;

                case 'BeforeStep':
                    var step = event.getPayloadItem('step');
                    self.handleAnyStep(step);
                    window.cucumberCurrentStep = (step.getKeyword() + step.getName())
                    .toString()
                    .replace(/'/g, "|'")
                    .replace(/\[/g, "|[")
                    .replace(/\]/g, "|]")
                    .replace(/:/g, "");
                    break;

                case 'StepResult':
                    var result;
                    var stepResult = event.getPayloadItem('stepResult');
                    if (stepResult.isSuccessful()) {
                        result = { status: 'passed' };
                    } else if (stepResult.isPending()) {
                        result = { status: 'pending' };
                    } else if (stepResult.isUndefined() || stepResult.isSkipped()) {
                        result = { status: 'skipped' };
                        if(!window.cucumberIsIgnored && !window.cucumberIsFailed){
                            tsm.testIgnored(window.cucumberCurrentScenario);
                            window.cucumberIsIgnored = true;
                        }
                    } else {
                        var error = stepResult.getFailureException();
                        var errorMessage = error.stack || error;
                        result = { status: 'failed', error_message: errorMessage };
                        var screenshotName =    window.cucumberCurrentFeature.toString().replace(/[?:"]*/g, "") + '.' +
                                                window.cucumberCurrentScenario.toString().replace(/[?:"]*/g, "") + '.' +
                                                window.cucumberCurrentStep.toString().replace(/[?:"]*/g, "");
                        tsm.testFailed(window.cucumberCurrentScenario, errorMessage.toString().replace(/\n/g, "|n|r"));
                        window.cucumberIsFailed = true;
                        if(window.callPhantom){
                            window.callPhantom({command: 'Take screenshot', fileName: screenshotName});
                        }
                    }
                    formatter.match({ uri: 'report.feature', step: { line: currentStep.getLine() } });
                    formatter.result(result);
                    break;

                case 'AfterScenario':
                    tsm.testFinished(window.cucumberCurrentScenario);
                    break;

                case 'AfterFeature':
                    tsm.suiteFinished(window.cucumberCurrentFeature);
                    break;
            }
            callback();
        },

        handleAnyStep: function handleAnyStep(step) {
            formatter.step({
                keyword: step.getKeyword(),
                name: step.getName(),
                line: step.getLine(),
            });
            currentStep = step;
        }
    };
    return self;
};