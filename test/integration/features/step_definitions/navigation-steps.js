
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
		var buttonSelector = "[data-pl-name=\"{buttonName}\"] .pl-popup-btn-toggle".replace("{buttonName}", buttonName);
		window.configWindow.$( buttonSelector ).click();
		next();
	} catch(err){
		next(err);
	}
});