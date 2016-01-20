
// Given

this.Given(/^я нахожусь на экране "([^"]*)"$/, function (viewName, next) {
    window.testHelpers.waitView(viewName,
		function () {
		    window.currentView = window.configWindow.contextApp.context.controls[viewName];
		    window.currentViewContext = window.currentView.getContext();
		    next();
		},
		function () {
		    next(new Error(viewName + ' not found'));
		}
	);
});


// Then

this.Then(/^система отобразит экран "([^"]*)"$/, function (viewName, next) {
    window.testHelpers.waitView(viewName,
		function () {
		    window.currentView = window.configWindow.contextApp.context.controls[viewName];
		    window.currentViewContext = window.currentView.getContext();
		    next();
		},
		function () {
		    next(new Error(viewName + ' not found'));
		}
	);
});

this.Then(/^система отобразит окно-сообщение "([^"]*)"$/, function (message, next) {
    var hasMessageBox = function () {
        return (window.configWindow.$.find('.messagebox:visible').length > 0);
    };

    var checkMessageText = function () {
        var messageBody = window.configWindow.$.find('.messagebox:visible > .modal-body');
        var text = $.trim($(messageBody).text());

        try {
            chai.assert.equal(text, message);
            next();
        } catch (err) {
            next(err);
        }
    };

    var fail = function () {
        next(new Error('MessageBox not found'));
    };

    window.testHelpers.waitCondition(hasMessageBox, checkMessageText, fail);
});

this.Then(/^система отобразит список кнопок: (.*?)$/, function (values, next) {
    var extValues = values
						.split(",")
						.map(function (item) {
						    var result = item.trim();
						    return result.substring(1, result.length - 1); //Удаляются кавычки
						});

    var actValues = window.configWindow.$(".btn-group.open .dropdown-menu > li .btntext")
					.map(function (index, item) {
					    return $(item).text();
					})
					.toArray();

    try{
		chai.assert.deepEqual(actValues, extValues);
		next();
	}catch(err){
		next(err);
	}
});

this.Then(/^система отобразит модальное окно "([^"]*)"$/, function (dialogView, next) {
    window.testHelpers.waitModalView(dialogView,
		function () {
		    window.currentView = window.currentView.context.controls[dialogView] || window.configWindow.contextApp.context.controls[dialogView];
		    window.currentViewContext = window.currentView.getContext();
		    next();
		},
		function () {
		    next(new Error(dialogView + ' not found'));
		}
	);
});

this.When(/^я закрою текущее модальное окно$/, function(next){
	if(window.currentView.close != undefined){
		window.currentView.close();
		next();
	}else{
		next(new Error('Method close() not found!'));
	}
});

this.Then(/^система отобразит значения выпадающего списка: (.*?)$/, function (values, next) {
    var extValues = values
						.split(",")
						.map(function (item) {
						    var result = item.trim();
						    return result.substring(1, result.length - 1); //Удаляются кавычки
						});

    var actValues = window.configWindow.$(".select2-results > li .select2-result-label")
					.map(function (index, item) {
					    return $(item).text();
					})
					.toArray();

    try{
		chai.assert.deepEqual(actValues, extValues);
    	next();
	}catch(err){
	    next(err);
	}
});

this.Then(/^система отобразит список валидационных сообщений: (.*?)$/, function(msgs, next){
	var haveToastr = function(){
		return window.configWindow.$("#toast-container") !== null;
	};
	var success = function(){
		var actual = window.configWindow.$("#toast-container .toast-message");
		var actualMessages = [];
		for(var i = 0;i < actual.length;i++){
			actualMessages.push(actual[i].innerHTML);
		}
		var messages = msgs.split(',').map(function(item){
			var result = item.trim();
			return result.substring(1, result.length - 1).replace(/'/g, '"')
		});
		
		try{
			chai.assert.deepEqual(actualMessages, messages);
			next();
		}catch(err){
			next(err);
		}
	};
	var fail = function(){
		next(new Error("Окно не найдено"));
	};
	window.testHelpers.waitCondition(haveToastr, success, fail);
});

this.Then(/^система не отобразит валидационных сообщений$/, function(next){
	var haveToastr = function(){
		return 	window.configWindow.$("#toast-container") !== null &&
				window.configWindow.$("#toast-container").length != 0;
	};
	var success = function(){
		next();
	}
	var fail = function(){
		var msgs = window.configWindow.$("#toast-container .toast-message");
		var line = "";
		for(var i = 0;i < msgs.length;i++){
			line += msgs[i].innerHTML + ", ";
		}
		next(new Error("Было обнаружено одно или несколько окон: " + line.substring(0, line.length - 2)));
	};
	
	window.testHelpers.waitCondition(haveToastr, fail, success, 3000, 500);
});

this.Then(/^я не увижу элемент "([^"]*)"$/, function(elementName, next){
	var haveElement = function(){
		return window.testHelpers.getControlByName(elementName) != undefined;
	}
	var wasFound = function(){
		var element = window.testHelpers.getControlByName(elementName);
		
		if(!!element.getVisible && !element.getVisible()){
			next();
		}else{
			var errorString = !!element.getVisible ? 'was found' : 'getVisible is undefined';
			next(new Error(elementName + ': ' + errorString));
		}
	}
	var wasntFound = function(){
		next();
	}
	
	window.testHelpers.waitCondition(haveElement, wasFound, wasntFound, 5000, 500);
});

this.Then(/^я не увижу элемент "([^"]*)" с текстом "([^"]*)"$/, function(elementName, elementText, next){
	var haveElement = function(){
		return window.testHelpers.getControlByName(elementName) != undefined;
	}
	var wasFound = function(){
		var element = window.testHelpers.getControlByName(elementName);
		
		try{
			if(element.getText() != elementText){
				next();
			}else{
				next(new Error(elementName + ' was found!'));
			}
		}catch(err){
			next(err);
		}
	}
	var wasntFound = function(){
		next();
	}
	
	window.testHelpers.waitCondition(haveElement, wasFound, wasntFound, 5000, 500);
});

this.Then(/^я увижу элемент "([^"]*)" с текстом "([^"]*)"$/, function(elementName, elementText, next){
	var haveElement = function(){
		return window.testHelpers.getControlByName(elementName) != undefined;
	}
	var wasFound = function(){
		var element = window.testHelpers.getControlByName(elementName);
		
		try{
			chai.assert.equal(element.getText(), elementText);
			next();
		}catch(err){
			next(err);
		}
	}
	var wasntFound = function(){
		next(new Error(elementName + ' not found!'));
	}
	
	window.testHelpers.waitCondition(haveElement, wasFound, wasntFound);
});

this.Then(/^я увижу элемент "([^"]*)"$/, function(elementName, next){
	var haveElement = function(){
		return window.testHelpers.getControlByName(elementName) != undefined;
	}
	var wasFound = function(){
		var element = window.testHelpers.getControlByName(elementName);
		
		try{
			chai.assert.isTrue(element.getVisible(), elementName + ': Visible == false');
			next();
		}catch(err){
			next(err);
		}
	}
	var wasntFound = function(){
		next(new Error(elementName + ' not found!'));
	}
	
	window.testHelpers.waitCondition(haveElement, wasFound, wasntFound);
});