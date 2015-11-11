
// When

this.When(/^я нажму на кнопку "([^"]*)"$/, function (buttonName, next) {
    try {
        window.currentViewContext.Controls[buttonName].click();
        next();
    } catch (err) {
        next(err);
    }
});

this.When(/^я нажму на ссылку "([^"]*)"$/, function (linkName, next) {
    try {
		var link = window.currentViewContext.Controls[linkName];
		chai.assert.isDefined(link);
        link.control.controlView.$el.click();
		next();
    } catch (err) {
        next(err);
    }
});

this.When(/^я нажму на выпадающий список кнопок "([^"]*)"$/, function (buttonName, next) {
    try {
        var buttonSelector = "[data-pl-name=\"{buttonName}\"] .pl-popup-btn-toggle".replace("{buttonName}", buttonName);
        window.configWindow.$(buttonSelector).click();
        next();
    } catch (err) {
        next(err);
    }
});

this.When(/^я нажму на выпадающий список "([^"]*)"$/, function (buttonName, next) {
    try {
        var buttonSelector = "[data-pl-name=\"{buttonName}\"] .select2-chosen".replace("{buttonName}", buttonName);
        window.configWindow.$(buttonSelector).mousedown(); //click() не срабатывает
        setTimeout(next, 100); //TODO: Найти аналог (элементы списка подгружаются после раскрытия)
    } catch (err) {
        next(err);
    }
});

this.When(/^я выберу пункт "([^"]*)"$/, function (value, next) {
    var selector = ".select2-results > li .select2-result-label:contains('{VALUE}')".replace("{VALUE}", value);
    window.configWindow.$(selector).mousedown().mouseup(); //TODO: Это бред конечно, но пока click() не работает
    setTimeout(next, 3000);
});