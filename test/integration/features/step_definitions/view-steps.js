
// Given

this.Given(/^я нахожусь на экране "([^"]*)"$/, function (viewName, next) {
	window.testHelpers.waitView(viewName, 
		function(){
			window.currentView = window.configWindow.contextApp.getChildView(viewName);
			window.currentViewContext = window.currentView.getContext();
			next();
		},
		function(){
			next(new Error(viewName + ' not found'));
		}
	);
});


// Then

this.Then(/^система отобразит экран "([^"]*)"$/, function (viewName, next) {
	window.testHelpers.waitView(viewName, 
		function(){
			window.currentView = window.configWindow.contextApp.getChildView(viewName);
			window.currentViewContext = window.currentView.getContext();
			next();
		},
		function(){
			next(new Error(viewName + ' not found'));
		}
	);
});

this.Then(/^система отобразит окно-сообщение "([^"]*)"$/, function (message, next) {
	var hasMessageBox = function(){
		return (window.configWindow.$.find('.messagebox:visible').length > 0);
	};

	var checkMessageText = function(){		
		var messageBody = window.configWindow.$.find('.messagebox:visible > .modal-body');
		var text = $.trim( $(messageBody).text() );

		try{
			chai.assert.equal(text, message);
			next();
		}catch(err){
			next(err);
		}		
	};

	var fail = function(){
		next(new Error('MessageBox not found'));
	};

	window.testHelpers.waitCondition(hasMessageBox, checkMessageText, fail);
});

this.Then(/^система отобразит список кнопок: (.*?)$/, function (values, next) {
	var valuesArray = values
						.split(",")
						.map(function(item){
							return item.trim();
						});
	var abc = $(".btn-group.open .dropdown-menu > li");
	debugger;
	next();
});

this.Then(/^система отобразит модальное окно "([^"]*)"$/, function (dialogView, next) {
	debugger;
	next();
});