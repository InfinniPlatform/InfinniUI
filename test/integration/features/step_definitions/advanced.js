this.When(/^замри на "([^"]*)"$/, function(seconds, next){
	setTimeout(next, seconds * 1000);
});