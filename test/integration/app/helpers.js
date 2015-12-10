window.testHelpers = {

	DEFAULT_VALUES: {
		/* Оптимальное время проверки существования элемента, иначе зависает */
		maxTimeout: 6000,
		timeoutStep: 500
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
			var view = window.configWindow.contextApp.getChildView(viewName);
			return view && view.isLoaded();
		};

		window.testHelpers.waitCondition(waitView, success, error, maxTimeout, step);
	},

	waitModalView: function(viewName, success, error, maxTimeout, step){
		var waitView = function(){
			var view = window.currentView.getChildView(viewName) || window.configWindow.contextApp.getChildView(viewName);
			return view && view.isLoaded();
		};

		window.testHelpers.waitCondition(waitView, success, error, maxTimeout, step);
	},

	getDate: function(iterator){
		iterator = iterator || 0;
		iterator *= 1000 * 60 * 60 * 24; 
		
		var today = new Date(Date.now() + iterator);
		//YYYY-MM-DD
        var currentDate = String.prototype.concat(today.getFullYear(), '-', today.getMonth() + 1, '-', today.getDate()); //+1 - January-0
		
        // TODO: Следить за датами
        return window.configWindow.moment(currentDate).format("YYYY-MM-DDTHH:mm:ss.SSS");
	},
	
	getControlByName: function(controlName){
		var indexInfo = /\[(\d+)\]/.exec(controlName);
		
		if(indexInfo == null){
			return window.currentViewContext.Controls[controlName];
		}else{
			var itemIndex = parseInt(indexInfo[1]);
			var itemName = controlName.match(/\w+/)[0];
			
			if(window.currentListBox == undefined || isNaN(itemIndex) || window.currentListBox.children.get(itemIndex) == undefined){
				return undefined;
			}
			
			var gridPanel = window.currentListBox.children.get(itemIndex);
			var result = gridPanel.children.findAllChildrenByName(itemName)[0];
			
			window.currentListBox.setSelectedItem(window.currentListBox.getItems()[itemIndex]);
					
			return result;
		}
	}
};