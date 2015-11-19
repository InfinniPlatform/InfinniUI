
// When

this.When(/^я введу в текстовое поле "([^"]*)" значение "([^"]*)"$/, function (fieldName, value, next) {
    var haveField = function(){
        return window.currentViewContext.Controls[fieldName] != undefined;
    }
    var success = function(){
        try {
            window.currentViewContext.Controls[fieldName].setValue(value);
            next();
        } catch (err) {
            next(err);
        }
    }
    var fail = function(){
        next(new Error(fieldName + ' not found!'));
    }
    window.testHelpers.waitCondition(haveField, success, fail);
});


this.When(/^я введу в числовое поле "([^"]*)" значение "([^"]*)"$/, function (fieldName, value, next) {
    var haveField = function(){
        return window.currentViewContext.Controls[fieldName] != undefined;
    }
    var success = function(){
        try {
            var numValue = parseInt(value);
            chai.assert.isNumber(numValue);

            window.currentViewContext.Controls[fieldName].setValue(numValue);

            next();
        } catch (err) {
            next(err);
        }
    }
    var fail = function(){
        next(new Error(fieldName + ' not found!'));
    }
    window.testHelpers.waitCondition(haveField, success, fail);
});

this.When(/^я введу в поле типа дата "([^"]*)" значение Сегодня$/, function (fieldName, next) {
    var haveField = function(){
        return window.currentViewContext.Controls[fieldName] != undefined;
    }
    var success = function(){
        try {
            var value = window.testHelpers.getCurrentDate();
            window.currentViewContext.Controls[fieldName].setValue(value);
            next();
        } catch (err) {
            next(err);
        }
    }
    var fail = function(){
        next(new Error(fieldName + ' not found!'));
    }
    window.testHelpers.waitCondition(haveField, success, fail);
});

// Then

this.Then(/^значение в поле "([^"]*)" равно "([^"]*)"$/, function (fieldName, value, next) {
    var haveValue = function () {
        return (window.currentViewContext.Controls[fieldName] != undefined);
    };

    var checkValue = function () {
        try {
            var field = window.currentViewContext.Controls[fieldName];
            chai.assert.isDefined(field);

            var actValue = field.getText();
            chai.assert.isTrue((actValue == value), actValue + ' != ' + value);

            next();
        } catch (err) {
            next(err);
        }
    };

    var fail = function () {
        next(new Error(fieldName + ' is undefined'));
    };

    window.testHelpers.waitCondition(haveValue, checkValue, fail);
});

this.Then(/^значение в поле "([^"]*)" списка "([^"]*)" равно "([^"]*)"$/, function(fieldName, listBoxName, value, next){
	var haveControls = function(){
		return 	window.currentViewContext.Controls[listBoxName] != undefined &&
				window.currentViewContext.Controls[fieldName] != undefined;
	}
	var success = function(){
		var elements = window.currentViewContext.Controls[listBoxName].children.findAllChildrenByName(fieldName);
		var isSuccess = false;

		for(var i = 0;i < elements.length && !isSuccess;i++){
			isSuccess = elements[i].getText() === value;
		}

		isSuccess ? next() : next(new Error(value + ' not found!'));
	}
	var fail = function(){
		var errorString = (window.currentViewContext.Controls[listBoxName] == undefined ? listBoxName : fieldName) + " not found!";
		next(new Error(errorString));
	}

	window.testHelpers.waitCondition(haveControls, success, fail);
});

this.Then(/^значение в поле типа дата "([^"]*)" равно Сегодня$/, function (fieldName, next) {
    var haveValue = function () {
        return (window.currentViewContext.Controls[fieldName] != undefined);
    };

    var checkValue = function () {
        try {
            var field = window.currentViewContext.Controls[fieldName];
            chai.assert.isDefined(field);

            var actValue = field.getValue().Date;
            var value = window.testHelpers.getCurrentDate();
            chai.assert.isTrue(actValue == value);

            next();
        } catch (err) {
            next(err);
        }
    };

    var fail = function () {
        next(new Error(fieldName + ' is undefined'));
    };

    window.testHelpers.waitCondition(haveValue, checkValue, fail);
});

this.Then(/^значение в выпадающем списке "([^"]*)" равно "([^"]*)"$/, function (fieldName, value, next) {
    var haveValue = function () {
        return (window.currentViewContext.Controls[fieldName] != undefined);
    };

    var checkValue = function () {
        try {
            var field = window.currentViewContext.Controls[fieldName];
            chai.assert.isDefined(field);

            var actValue = field.getValue().DisplayName;
            chai.assert.isTrue((actValue == value), actValue + ' != ' + value);

            next();
        } catch (err) {
            next(err);
        }
    };

    var fail = function () {
        next(new Error(fieldName + ' is undefined'));
    };

    window.testHelpers.waitCondition(haveValue, checkValue, fail);
});

this.Then(/^флаг "([^"]*)" будет иметь значение "([^"]*)"$/, function (flagName, value, next) {
    var haveFlag = function(){
        return window.currentViewContext.Controls[flagName] != undefined;
    }
    var success = function(){
        var flag = window.currentViewContext.Controls[flagName];

        chai.assert.isDefined(flag);
        chai.assert.equal(flag.getValue(), JSON.parse(value));

        next();
    }
    var fail = function(){
        next(new Error(flagName + ' not found!'));
    }
    window.testHelpers.waitCondition(haveFlag, success, fail);
});