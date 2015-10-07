window.testHelpers = {

	DEFAULT_VALUES: {
		maxTimeout: 10000,
		timeoutStep: 10
	},

	waitCondition: function(condition, success, error, maxTimeout, step){
		maxTimeout = maxTimeout || window.testHelpers.DEFAULT_VALUES.maxTimeout;
		step = step || window.testHelpers.DEFAULT_VALUES.timeoutStep;
		var i = 1;

		var waiting = function(){
			if( condition() ){
				if($.isFunction(success)){
					success();
				}				

				return;
			}

			if( i * step >= maxTimeout ){
				if($.isFunction(error)){
					error();
				} else {
					debugger;
				}

				return;
			}
			
			++i;
			setTimeout(waiting, step);
		}
		
		setTimeout(waiting, step);
	},

	waitView: function(viewName, success, error, maxTimeout, step){
		var waitView = function(){
			if(!window.configWindow.contextApp)
				return false;
			var childViews = window.configWindow.contextApp.getChildViews();
			return Object.keys(childViews).includes(viewName);
		};

		window.testHelpers.waitCondition(waitView, success, error, maxTimeout, step);
	}
};