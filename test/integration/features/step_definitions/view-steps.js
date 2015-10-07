
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
	var extValues = values
						.split(",")
						.map(function(item){
							var result = item.trim();
							return result.substring(1, result.length - 1);
						});

	var actValues = window.configWindow.$(".btn-group.open .dropdown-menu > li .btntext")
					.map(function(index, item){
						return $(item).text();
					})
					.toArray();
	
	chai.assert.deepEqual(actValues, extValues);

	next();
});

this.Then(/^система отобразит модальное окно "([^"]*)"$/, function (dialogView, next) {
	window.testHelpers.waitModalView(dialogView, 
		function(){
			window.currentView = window.currentView.getChildView(dialogView);
			window.currentViewContext = window.currentView.getContext();
			next();
		},
		function(){
			next(new Error(dialogView + ' not found'));
		}
	);
});

this.Then(/^система отобразит в модальном окне страницу "([^"]*)"$/, function (page, next) {
	debugger;
	next();
});