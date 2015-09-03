/**
 * @class
 * @augments TextEditorBaseView
 */
var DatePickerView = TextEditorBaseView.extend(/** @lends DatePickerView.prototype */{

    template: InfinniUI.Template["new/controls/datePicker/template/datePicker.tpl.html"],

    UI: _.extend({}, TextEditorBaseView.prototype.UI, {

    }),

    events: _.extend({}, TextEditorBaseView.prototype.events, {
        'focus .pl-date-picker-input': 'onFocusControlHandler',
        'mouseenter .pl-date-picker-input': 'onMouseenterControlHandler',
    }),

    render: function () {
        this.prerenderingActions();
        this.renderTemplate(this.template);
        this.renderDatePickerEditor();
        this.trigger('render');
        this.postrenderingActions();
        return this;
    },

    getData: function () {
        var
            model = this.model;

        return _.extend({},
            TextEditorBaseView.prototype.getData.call(this), {
                minValue: model.get('minValue'),
                maxValue: model.get('maxValue'),
                mode: model.get('mode')
            });
    },

    renderDatePickerEditor: function () {
        var model = this.model;

        this.renderControlEditor({
            el: this.ui.editor,
            multiline: false
        });

        return this;
    },

    initOnChangeHandler: function () {
        TextEditorBaseView.prototype.initOnChangeHandler.call(this);

        this
            .listenTo(this.model, 'change:minValue', this.onChangeMinValueHandler)
            .listenTo(this.model, 'change:maxValue', this.onChangeMaxValueHandler)
            .listenTo(this.model, 'change:mode', this.onChangeModeHandler);
    },

    onChangeMinValueHandler: function (model, value) {

    },

    onChangeMaxValueHandler: function (model, value) {

    },

    onChangeIncrementHandler: function (model, value) {

    },

    onChangeModeHandler: function (model, value) {

    },

    onChangeEnabledHandler: function (model, value) {
        this.ui.control.prop('disabled', !value);
    },

    /**
     * Используется миксином textEditorMixin
     * @param value
     * @returns {boolean}
     */
    onEditorValidate: function (value) {
        return true;
    }

});
