
/**
 * @constructor
 */
function PopupButton(){

    var $element = $(InfinniUI.Template["controls/popupButton/template/popupbutton.tpl.html"]());

    var _action = null;

    var items = [];

    this.render = function(){

        $element.find('li').detach();
        for(var i = 0 ; i < items.length ; i++){

            var $el = items[i].render();
            $element.find(".dropdown-menu").append($('<li></li>').append($el));
        };

        return $element;
    }

    this.addItem = function(item){
        items.push(item);
        this.render();
    }

    this.removeItem = function(element){
        items.splice(items.indexOf(element),1);
        this.render();
    }

    this.getItems = function(){
        return items;
    }

    this.getItem = function(name){
        for(var i = 0 ; i < items.length; i++){
            if(items[i].getName() === name) return items[i];
        }
        return null;
    }

    this.setText = function(text){
        $element.find('.pl-popup-btn-main').text(text);
    }

    this.getText = function(){
        return $element.find('.pl-popup-btn-main').text();
    }

    this.setVisible = function(visibility){
        if(visibility === undefined) return;

        if(!visibility){
            $element.addClass('display-hide');
        }
        else{
            $element.removeClass('display-hide');
        }
    }

    this.getVisible = function(){
        return $element.hasClass('display-hide');
    }


    this.getAction = function () {
        return _action;
    }

    this.setAction = function (action) {
        var self = this;
        _action = action;
        $element.find('.pl-popup-btn-main').off('click.ACTION');
        $element.find('.pl-popup-btn-main').on('click.ACTION',function(){
            if(self.getAction()!=null)self.getAction().execute();
        });

    }

    this.click = function () {
        $element.find('.pl-popup-btn-main').click();
    }

    this.onClick = function (handler) {
        $element.find('.pl-popup-btn-main').click(handler);
    }

    this.setHorizontalAlignment = function(){
        //todo add alignment
    }
}
