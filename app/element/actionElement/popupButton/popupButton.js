var PopupButton = function (parentView) {
    _.superClass(PopupButton, this, parentView);
};

_.inherit(PopupButton, Button);

_.extend(PopupButton.prototype, {

    addItem: function(item){
        this.control.addItem(item);
    },

    removeItem: function(element){
        this.control.removeItem(element);
    },

    getItems: function(){
        return this.control.getItems();
    },

    getItem: function(name){
        return this.control.getItem(name);
    },

    createControl: function () {
        return new PopupButtonControl();
    }

});