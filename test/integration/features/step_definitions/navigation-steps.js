
// When

this.When(/^я нажму на кнопку "([^"]*)"$/, function (buttonName, next) {
	try{
		window.currentViewContext.Controls[buttonName].click();
		next();
	} catch(err){
		next(err);
	}
});

this.When(/^я нажму на выпадающий список "([^"]*)"$/, function (buttonName, next) {
	try{
		window.currentViewContext.Controls[buttonName].click();
		next();
	} catch(err){
		next(err);
	}
});