
// When

this.When(/^я введу в текстовое поле "([^"]*)" значение "([^"]*)"$/, function (fieldName, value, next) {
	try{
		window.currentViewContext.Controls[fieldName].setValue(value);
		next();
	} catch(err){
		next(err);
	}
});


this.When(/^я введу в числовое поле "([^"]*)" значение "([^"]*)"$/, function (fieldName, value, next) {
	try{
		var numValue = parseInt(value);
		chai.assert.isNumber( numValue );

		window.currentViewContext.Controls[fieldName].setValue( numValue );

		next();
	} catch(err){
		next(err);
	}
});

this.When(/^я введу в поле типа дата "([^"]*)" значение "Сегодня"$/, function (fieldName, next) {
	try{
		window.currentViewContext.Controls[fieldName].setValue( new Date() );
		next();
	} catch(err){
		next(err);
	}
});

// Then

this.Then(/^значение в поле "([^"]*)" равно "([^"]*)"$/, function (fieldName, value, next) {

	var haveValue = function(){
		return (window.currentViewContext.Controls[fieldName] != undefined);
	};

	var checkValue = function(){
		try{
			var field = window.currentViewContext.Controls[fieldName];
			chai.assert.isDefined(field);

			var actValue = field.getValue();
			chai.assert.isTrue( (actValue == value) || (actValue.DisplayName == value), actValue + ' != ' + value + ' and ' + actValue.DisplayName + ' != ' + value);

			next();
		} catch (err){
			next(err);
		}
	};

	var fail = function(){
		next(new Error(fieldName + ' is undefined'));
	};

	window.testHelpers.waitCondition(haveValue, checkValue, fail);
});

this.Then(/^флаг "([^"]*)" будет иметь значение "([^"]*)"$/, function (flagName, value, next) {
	var flag = window.currentViewContext.Controls[flagName];

	chai.assert.isDefined(flag);
	chai.assert.equal(flag.getValue(), JSON.parse(value));

	next();
});