var ButtonEditView = TextBoxView.extend(/** @lends ButtonEditView.prototype */{

    template: {
        oneline: InfinniUI.Template["new/controls/buttonEdit/template/textBoxInput.tpl.html"],
        multiline: InfinniUI.Template["new/controls/buttonEdit/template/textBoxArea.tpl.html"]
    },

    className: 'pl-button-edit form-group',

    UI: _.extend({}, TextBoxView.prototype.UI, {
        iconAction: '.pl-button-edit-button__icon_action',
        buttonClear: '.pl-button-edit-button_clear'
    }),

    events: _.extend({}, TextBoxView.prototype.events, {
        'click .pl-button-edit-button_action': 'onClickButtonHandler',
        'click .pl-button-edit-button_clear': 'onClickClearHandler'
    }),

    initHandlersForProperties: function () {
        TextBoxView.prototype.initHandlersForProperties.call(this);
        this.listenTo(this.model, 'change:icon', this.updateIcon);
        this.listenTo(this.model, 'change:showClear', this.updateShowClear);
    },

    updateProperties: function () {
        TextBoxView.prototype.updateProperties.call(this);
        this.updateIcon();
    },

    updateIcon: function () {
        var icon = this.model.get('icon');
        this.switchClass('fa', icon, this.ui.iconAction);
    },

    updateShowClear: function () {
        var showClear = this.model.get('showClear');
        var value = this.model.get('value');

        this.ui.buttonClear.toggleClass('hidden',  !showClear || _.isEmpty(value));
    },

    updateValue: function () {
        TextBoxView.prototype.updateValue.call(this);
        this.updateShowClear();
    },

    onClickButtonHandler: function (event) {
        this.trigger('buttonClick', event);
    },

    onClickClearHandler: function (event) {
        this.model.clearValue();
    }

});