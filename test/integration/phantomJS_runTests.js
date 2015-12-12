var page = require('webpage').create();
var url = 'http://localhost:8181/test/integration';

page.settings.webSecurityEnabled = false;

console.log('Status: started!');

page.onConsoleMessage = function (msg) {
    console.log('CONSOLE: ' + msg);
    if (msg === "Tests finished!") {
        setTimeout(function () {
            phantom.exit();
        }, 2000);
    }
    /* Ситуации, при которых может произойти зацикливание */
    if (msg.indexOf('Unhandled rejection') != -1 ||
		msg.indexOf('signOut not called') != -1
	) {
        page.pages[0].render('ErrorLogs/' + msg.replace(/[?:"]*/g, "") + '.png');
        phantom.exit(2);
    }

    if (msg.indexOf('Take screenshot') != -1) {
        var fileName = msg.substring(msg.indexOf(':') + 1);
        page.pages[0].render('ErrorLogs/' + fileName + '.png');
    }
};

page.onPageCreated = function (newPage) {
    newPage.viewportSize = {
        width: 1920,
        height: 1080
    };
    console.log('A new child page was created!');
    newPage.onClosing = function (closingPage) {
        console.log('A child page is closing: ' + closingPage.url);
    };
    newPage.onConsoleMessage = function (msg) {
        console.log('CONSOLE(child page): ' + msg);
        /* Ситуации, при которых может произойти зацикливание */
        if (msg.indexOf('Unhandled rejection') != -1 ||
            msg.indexOf('signOut not called') != -1
        ) {
            newPage.render('ErrorLogs/' + msg.replace(/[?:"]*/g, "") + '.png');
            phantom.exit(2);
        }
    };
    newPage.onLoadFinished = function () {
        console.log('New child page url:' + newPage.url);
    };
};

page.clearMemoryCache();

page.open(url, function (status) {

    if (status === 'success') {
        console.log('Status: openned!');
    } else {
        console.log('Status: something went wrong!');
        phantom.exit(1);
    }
});