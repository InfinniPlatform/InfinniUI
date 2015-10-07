
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

// Then

this.Then(/^значение в поле "([^"]*)" равно "([^"]*)"$/, function (fieldName, value, next) {

	var haveValue = function(){
		return (window.currentViewContext.Controls[fieldName] != undefined);
	};

	var checkValue = function(){
		try{
			var field = window.currentViewContext.Controls[fieldName];

			chai.assert.isDefined(field);
			chai.assert.equal(field.getValue(), value);

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