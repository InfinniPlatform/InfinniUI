/**
 * @param parent
 * @augments Element
 * @constructor
 */
function Button(parent) {
    _.superClass(Button, this, parent);
    this.init();
}

_.inherit(Button, Element);

_.extend(Button.prototype, {

    init: function () {
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
        control.set('action', value);

        if (this.isFirstAction) {
            this.isFirstAction = false;

            this.onClick(function () {
                var action =control.get('action');
                if (action ) {
                    action .execute();
                }
            });
        }
    },

    getAction: function () {
        return this.control.get('action');
    },

    onClick: function (handler) {
        this.control.onClick(handler);
    },

    click: function () {
        this.control.click();
    },

    createControl: function () {
        return new ButtonControl();
    }
});
