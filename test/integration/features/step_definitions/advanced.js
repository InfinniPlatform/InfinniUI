this.When(/^Ожидание на "([^"]*)"$/, function(seconds, next){
	setTimeout(next, seconds * 1000);
});