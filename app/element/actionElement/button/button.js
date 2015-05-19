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

    click: function () {

        this.control.click();
    },

    onClick: function (handler) {
        this.control.onClick(handler);
    },

    getHeight: function () {
        return 34;
    }
});