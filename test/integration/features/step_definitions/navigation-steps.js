
// When

this.When(/^я нажму на кнопку "([^"]*)"$/, function (buttonName, next) {
	try{
		window.currentViewContext.Controls[buttonName].click();
		next();
	} catch(err){
		next(err);
	}
});

this.When(/^я нажму в главном меню на пункт "([^"]*)"$/, function (buttonName, next) {

	var haveMainMenu = function(){
		return window.configWindow.contextApp && window.configWindow.contextApp.context && Object.keys(window.configWindow.contextApp.context.Controls).includes('MainMenu');
	};

	var clickButton = function(){
		try{
			window.configWindow.contextApp.context.Controls[buttonName].click();
			next();
		} catch(err){
			next(err);
		}
	};
	
	var fail = function(){
		next(new Error('Menu is undefined'));
	};

	window.testHelpers.waitCondition(haveMainMenu, clickButton, fail);
});

this.When(/^я нажму на выпадающий список "([^"]*)"$/, function (buttonName, next) {
	try{
		window.currentViewContext.Controls[buttonName].click();
		next();
	} catch(err){
		next(err);
	}
});