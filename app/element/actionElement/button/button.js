function Button(parentView) {
    _.superClass(Button, this, parentView);
}

_.inherit(Button, Element);

_.extend(Button.prototype, {
    createControl: function () {
        return new ButtonControl();
    },

    getAction: function () {
        return this.control.get('action');
    },

    setAction: function (action) {
        var self = this,
            isFirstAction = !this.control.get('action');
        this.control.set('action', action);

        if (isFirstAction) {
            this.onClick(function () {
                var action = self.getAction();
                if (action) {
                    action.execute();
                }
            });
        }
    },

    setImage: function(image){
        this.control.set('image', image);
    },

    getImage: function(){
        this.control.get('image');
    },

    click: function () {

        this.control.click();
    },

    onClick: function (handler) {
        this.control.onClick(handler);
    },

    getHeight: function () {
        return 34;
    },

    setParentEnabled: function(enabled){
        if(enabled == undefined){
            enabled = true;
        }
        return this.control.set('parentEnabled', enabled);
    },

    getParentEnabled: function(){
        return this.control.get('parentEnabled');
    },

    onEnabledChange: function (handler) {
        this.control.onEnabledChange(handler);
    }
});