
// When

this.When(/^я введу в текстовое поле "([^"]*)" значение "([^"]*)"$/, function (fieldName, value, next) {
    var haveField = function(){
        return window.testHelpers.getControlByName(fieldName) != undefined;
    }
    var success = function(){
        try {
            window.testHelpers.getControlByName(fieldName).setValue(value);
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
        return window.testHelpers.getControlByName(fieldName) != undefined;
    }
    var success = function(){
        try {
            var numValue = parseInt(value);
            chai.assert.isNumber(numValue);

            window.testHelpers.getControlByName(fieldName).setValue(numValue);

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

this.When(/^я введу в поле типа дата "([^"]*)" значение "([^"]*)"$/, function (fieldName, dateString, next) {
    var haveField = function(){
        return window.testHelpers.getControlByName(fieldName) != undefined;
    }
    var success = function(){
        try {
			var date = dateString.match(/[а-я]*/i)[0];
			var iterator = dateString.match(/\w+/g) != null ? parseInt(dateString.match(/\w+/g)[0]) : 0;

			if(date === "Сегодня" && !isNaN(iterator)){
				var value = window.testHelpers.getDate(iterator);
				window.testHelpers.getControlByName(fieldName).setValue(value);
			}else{
                date = window.testHelpers.getFormattedDate(dateString);
				window.testHelpers.getControlByName(fieldName).setValue(date);
			}

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
        return window.testHelpers.getControlByName(fieldName) != undefined;
    };

    var checkValue = function () {
        try {
            var field = window.testHelpers.getControlByName(fieldName);
            chai.assert.isDefined(field);

            var actValue = field.getDisplayValue();
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

this.Then(/^значение в поле типа дата "([^"]*)" равно "([^"]*)"$/, function (fieldName, dateString, next) {
    var haveValue = function () {
        return window.testHelpers.getControlByName(fieldName) != undefined;
    };

    var checkValue = function () {
        try {
            var field = window.testHelpers.getControlByName(fieldName);
            chai.assert.isDefined(field);

            var actValue = field.getValue();
            
            if(typeof actValue != "string"){
                actValue = actValue.Date;
            }
            
			var date = dateString.match(/[а-я]*/i)[0];
			var iterator = dateString.match(/\w+/g) != null ? parseInt(dateString.match(/\w+/g)[0]) : 0;
			
			if(date === "Сегодня" && !isNaN(iterator)){
				var value = window.testHelpers.getDate(iterator);
				chai.assert.equal(new Date(value).getTime(), new Date(actValue).getTime(), value + ' != ' + actValue);
			}else{
                date = window.testHelpers.getFormattedDate(dateString);
				chai.assert.equal(new Date(date).getTime(), new Date(actValue).getTime(), date + ' != ' + actValue);
			}

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
        return window.testHelpers.getControlByName(fieldName) != undefined;
    };

    var checkValue = function () {
        try {
            var field = window.testHelpers.getControlByName(fieldName);
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
        return window.testHelpers.getControlByName(flagName) != undefined;
    }
    var success = function(){
        var flag = window.testHelpers.getControlByName(flagName);

        try{
            chai.assert.isDefined(flag);
            chai.assert.equal(flag.getValue(), JSON.parse(value));
            next();
        }catch(err){
            next(err);
        }
    }
    var fail = function(){
        next(new Error(flagName + ' not found!'));
    }
    window.testHelpers.waitCondition(haveFlag, success, fail);
});

this.When(/^я поменяю значение флага "([^"]*)" на "([^"]*)"$/, function(flagName, value, next){
	var haveFlag = function(){
		return window.testHelpers.getControlByName(flagName) != undefined;
	}
	var success = function(){
		var flag = window.testHelpers.getControlByName(flagName);
		var parseValue = JSON.parse(value);
		
		if(typeof parseValue == "boolean"){
			flag.setValue(parseValue);
			next();
		}else{
			next(new Error("'" + value + "' is not correct value"));
		}
	}
	var fail = function(){
		next(new Error(flagName + ' not found!'));
	}
	
	window.testHelpers.waitCondition(haveFlag, success, fail);
});

this.Then(/^значение в текстовом поле "([^"]*)" равно "([^"]*)"$/, function (fieldName, value, next){
	var haveField = function () {
        return window.testHelpers.getControlByName(fieldName) != undefined;
    };

    var checkValue = function () {
        try {
            var field = window.testHelpers.getControlByName(fieldName);
            chai.assert.isDefined(field);

            var actValue = field.getValue();

            if(typeof actValue == "number"){
                value = parseInt(value);
            }

            chai.assert.isTrue((actValue === value), actValue + ' != ' + value);

            next();
        } catch (err) {
            next(err);
        }
    };

    var fail = function () {
        next(new Error(fieldName + ' is undefined'));
    };

    window.testHelpers.waitCondition(haveField, checkValue, fail);
});

this.Then(/^значение в числовом поле "([^"]*)" равно "([^"]*)"$/, function (fieldName, value, next){
	var haveField = function () {
        return window.testHelpers.getControlByName(fieldName) != undefined;
    };

    var checkValue = function () {
        try {
            var field = window.testHelpers.getControlByName(fieldName);
            chai.assert.isDefined(field);
			
			value = parseInt(value);

            var actValue = field.getDisplayValue();
			chai.assert.typeOf(actValue, 'number');
            chai.assert.isTrue((actValue === value), actValue + ' != ' + value);

            next();
        } catch (err) {
            next(err);
        }
    };

    var fail = function () {
        next(new Error(fieldName + ' is undefined'));
    };

    window.testHelpers.waitCondition(haveField, checkValue, fail);
});