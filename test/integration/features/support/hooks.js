this.BeforeScenario(function (scenario, callback) {

    window.toastrMessageCount = 0;

    var mongoServise = {
        url: 'http://localhost:60520',
        body: {
            commands: [
                'remove',
                'restore'
            ]
        }
    };

    var p = $.ajax({
        url: mongoServise.url,
        type: 'POST',
        data: JSON.stringify(mongoServise.body)
    });

    p.always(function () {
        // TODO: При появлении непонятных ошибок взглянуть на лог mongoDB сервиса
        openHost(callback);
    });
});

this.AfterFeatures(function () {
    console.log('Test finished!');

    if (window.startUpParameters && window.startUpParameters.isClosing) {
        window.close();
    }
});

this.AfterScenario(function (scenario, callback) {
    window.configWindow.close();
    callback();
});

this.AfterStep(function (step, callback) {
    if (!window.configWindow.toastr.options.onShown) {
        window.configWindow.toastr.options.onShown = function () {
            var toastClass = window.configWindow.$(this).attr('class');
            if (toastClass.indexOf('toast-error') != -1 || toastClass.indexOf('toast-success') != -1) {
                window.toastrMessageCount++;
            }
        }
    }
    callback();
});

var openHost = function (callback) {
    window.configWindow = window.open(window.IntegrationTestConfig.host);

    var signOut = function () {
        window.configWindow.contextApp.context.global.session.signOut(function () {
            window.configWindow.location.reload();
            callback();
        });
    };

    var error = function () {
        console.log('signOut not called!');
        callback();
    };

    window.testHelpers.waitCondition(function () {
        return window.configWindow.contextApp != null;
    }, signOut, error);
};