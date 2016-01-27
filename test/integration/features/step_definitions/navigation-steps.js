
// When

this.When(/^я нажму на кнопку "([^"]*)"$/, function (buttonName, next) {
	var haveButton = function(){
		return window.testHelpers.getControlByName(buttonName) != undefined;
	}
    var success = function(){
    	try {
			var button = window.testHelpers.getControlByName(buttonName);
			if(button.getVisible()){
				button.click();
				next();	
			}else{
				next(new Error(buttonName + ': Visible == false'));
			}
	    } catch (err) {
	        next(err);
	    }
    }
    var fail = function(){
    	next(new Error(buttonName + " not found!"));
    }
	window.testHelpers.waitCondition(haveButton, success, fail);
});

this.When(/^я нажму на ссылку "([^"]*)"$/, function (linkName, next) {
	var haveLink = function(){
		return window.testHelpers.getControlByName(linkName) != undefined;
	}
	
	var success = function(){
		try{
			var link = window.testHelpers.getControlByName(linkName);
			link.click();
			next();
		}catch(err){
			next(err);
		}
	}
	
	var fail = function(){
		next(new Error(linkName + " not found!"));
	}
	
	window.testHelpers.waitCondition(haveLink, success, fail);
});

this.When(/^я нажму на выпадающий список кнопок "([^"]*)"$/, function (buttonName, next) {
	var buttonSelector = "[data-pl-name=\"{buttonName}\"] .pl-popup-btn-toggle".replace("{buttonName}", buttonName);
	
	var haveButton = function(){
		return window.configWindow.$(buttonSelector).length != 0;
	}
	var success = function(){
		try {
			window.configWindow.$(buttonSelector).click();
			next();
		} catch (err) {
			next(err);
    	}
	}
	var fail = function(){
		next(new Error(buttonName + ' not found!'));
	}
    window.testHelpers.waitCondition(haveButton, success, fail);
});

this.When(/^я нажму на выпадающий список "([^"]*)"$/, function (buttonName, next) {
	var buttonSelector = "[data-pl-name=\"{buttonName}\"] .select2-chosen".replace("{buttonName}", buttonName);

	var haveButton = function(){
		return window.configWindow.$(buttonSelector).length != 0;
	}
	var success = function(){
		try {
	        window.configWindow.$(buttonSelector).mousedown(); //click() не срабатывает
	        next();
	    } catch (err) {
	        next(err);
    	}
	}
	var fail = function(){
		next(new Error(buttonName + ' not found!'));
	}

	window.testHelpers.waitCondition(haveButton, success, fail);
});

this.When(/^я выберу пункт "([^"]*)"$/, function (value, next) {
    var selector = ".select2-results > li .select2-result-label:contains('{VALUE}')".replace("{VALUE}", value);

    var haveValue = function(){
    	return window.configWindow.$(selector).length != 0;
    }
    var success = function(){
    	window.configWindow.$(selector).mousedown().mouseup(); //TODO: Это бред конечно, но пока click() не работает
    	next();
    }
    var fail = function(){
		next(new Error(value + ' not found!'));
	}

	window.testHelpers.waitCondition(haveValue, success, fail);
});

this.When(/^я нажму в окне-сообщении на кнопку "([^"]*)"$/, function(buttonText, next){
	var haveButton = function(){
		return window.configWindow.$.find('.messagebox:visible .modal-footer :contains({btnText})'.replace('{btnText}', buttonText)).length > 0;
	}
	var success = function(){
		var button = window.configWindow.$.find('.messagebox:visible .modal-footer :contains({btnText})'.replace('{btnText}', buttonText))[0];
		button.click();
		next();
	}
	var fail = function(){
		next(new Error(buttonText + ' not found!'));
	}
	
	window.testHelpers.waitCondition(haveButton, success, fail);
});

this.When(/^я выберу список "([^"]*)"$/, function(listBoxName, next){
	var haveList = function(){
		return window.testHelpers.getControlByName(listBoxName) != undefined;
	}
	var success = function(){
		window.currentListBox = window.testHelpers.getControlByName(listBoxName);
		next();
	}
	var fail = function(){
		next(new Error(listBoxName + ' not found!'));
	}
	
	window.testHelpers.waitCondition(haveList, success, fail);
});

this.When(/^я выберу вкладку "([^"]*)" на панели "([^"]*)"$/, function(fieldText, panelName, next){
    var havePanel = function(){
        return window.testHelpers.getControlByName(panelName) != undefined;
    }
    var success = function(){
        try {
            var panel = window.testHelpers.getControlByName(panelName);
            var tabPanels = panel.getChildElements();
            var index = -1;
            
            for(var i = 0;i < tabPanels.length && index == -1;i++){
                if(tabPanels[i].getText() === fieldText){
                    index = i;
                }
            }
            
            if(index != -1){
                panel.setSelectedItem(tabPanels[index]);
                next();
            }else{
                next(new Error(fieldText + ' not found!'));
            }
        } catch (error) {
            next(error);
        }
    }
    var fail = function(){
        next(new Error(panelName + ' not found!'));
    }
    
    window.testHelpers.waitCondition(havePanel, success, fail);
});

this.When(/^я нажму на радиокнопку "([^"]*)" в группе "([^"]*)"$/, function(buttonText, radioGroupName, next){
	var haveGroup = function(){
		return window.testHelpers.getControlByName(radioGroupName) != undefined;
	}
	var success = function(){
		var radioGroup = window.testHelpers.getControlByName(radioGroupName);
		var items = radioGroup.getItems().toArray();
		var check = false;

		items.forEach(function(item){
			for(var property in item){
				if(item[property] === buttonText){
					radioGroup.setSelectedItem(item);
					radioGroup.setValue(item);
					check = true;
				}
			}
		});

		if(check){
			next();
		}else{
			next(new Error(buttonText + ' not found!'));
		}
	}
	var fail = function(){
		next(new Error(radioGroupName + ' not found!'));
	}

	window.testHelpers.waitCondition(haveGroup, success, fail);
});

this.When(/^я выберу в текущем списке элемент под номером "([^"]*)"$/, function(index, next){
	if(!window.currentListBox){
		next(new Error("Список не выбран"));
	}else{
		try{
			var item = window.currentListBox.getItems().getByIndex(index);

			if(item){
				window.currentListBox.setSelectedItem(item);
				next();
			}else{
				next(new Error("Out of range, length = " + window.currentListBox.getItems().toArray().length));
			}
		}catch(err){
			next(err);
		}
	}
});