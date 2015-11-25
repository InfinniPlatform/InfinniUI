var page = require('webpage').create();
var url = 'http://localhost:8181/test/integration';

page.settings.webSecurityEnabled = false;

console.log('Status: started!');

page.onConsoleMessage = function(msg) {
	console.log('CONSOLE: ' + msg);
	if(msg === "Tests finished!"){
		setTimeout(function() {
			phantom.exit();
		}, 2000);
	}
};

page.onPageCreated = function(newPage) {
	console.log('A new child page was created!');
	newPage.onClosing = function(closingPage) {
  		console.log('A child page is closing: ' + closingPage.url);
	};
	newPage.onConsoleMessage = function(msg) {
		console.log('CONSOLE: ' + msg);
	};
	newPage.onLoadFinished = function(){
		console.log('New child page url:' + newPage.url);
    };
};

page.clearMemoryCache();

page.open(url, function (status) {
	
	if(status === 'success'){
		console.log('Status: openned!');
	}else{
		console.log('Status: something went wrong!');
		phantom.exit();
	}
});