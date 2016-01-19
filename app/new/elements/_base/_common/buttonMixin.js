var buttonMixin = {

    buttonInit: function () {
        this.isFirstAction = true;
    },

    getContent: function () {
        return this.control.get('content');
    },

    setContent: function (value) {
        this.control.set('content', value);
    },

    getContentTemplate: function () {
        return this.control.get('contentTemplate');
    },

    setContentTemplate: function (value) {
        this.control.set('contentTemplate', value);
    },

    setAction: function (value) {
        var control = this.control;
        var that = this;
        control.set('action', value);

        if (this.isFirstAction) {
            this.isFirstAction = false;

            this.onClick(function () {
                var enabled = this.getEnabled();
                var action = control.get('action');

                if (enabled) {
                    if (action ) {
                        action.execute();
                    }
                }
            });
        }
    },

    getAction: function () {
        return this.control.get('action');
    },

    click: function () {
        this.control.click();
    }

};