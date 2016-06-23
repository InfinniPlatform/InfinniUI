var ButtonEditView = TextBoxView.extend(/** @lends ButtonEditView.prototype */{

    template: {
        oneline: InfinniUI.Template["controls/buttonEdit/template/textBoxInput.tpl.html"],
        multiline: InfinniUI.Template["controls/buttonEdit/template/textBoxArea.tpl.html"]
    },

    className: 'pl-button-edit form-group',

    UI: _.extend({}, TextBoxView.prototype.UI, {
        iconAction: '.pl-button-edit-button__icon_action',
        buttonClear: '.pl-button-edit-button_clear',
        buttons: '.pl-button-edit-button'
    }),

    events: _.extend({}, TextBoxView.prototype.events, {
        'click .pl-button-edit-button_action': 'onClickButtonHandler',
        'click .pl-button-edit-button_clear': 'onClickClearHandler'
    }),

    initHandlersForProperties: function () {
        TextBoxView.prototype.initHandlersForProperties.call(this);
        this.listenTo(this.model, 'change:icon', this.updateIcon);
        this.listenTo(this.model, 'change:showClear', this.updateShowClear);
        this.listenTo(this.model, 'change:readOnly', this.updateReadOnly);
    },

    updateProperties: function () {
        TextBoxView.prototype.updateProperties.call(this);
        this.updateIcon();
        this.updateShowClear();
        this.updateReadOnly();
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

    updateReadOnly: function () {
        var readOnly = this.model.get('readOnly');

        this.ui.control.prop('readonly', readOnly);
    },

    updateEnabled: function () {
        var enabled = this.model.get('enabled');
        TextBoxView.prototype.updateEnabled.call(this);

        //@TODO Update button states
        this.ui.buttons.toggleClass('pl-button-edit-button_disabled', !enabled);
    },

    updateValue: function () {
        TextBoxView.prototype.updateValue.call(this);
        this.updateShowClear();
    },

    onClickButtonHandler: function (event) {
        var enabled = this.model.get('enabled');

        if (enabled) {
            this.trigger('buttonClick', event);
        }
    },

    onClickClearHandler: function (event) {
        this.model.clearValue();
    }

});