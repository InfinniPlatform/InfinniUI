/**
 * @class
 * @augments TextEditorBaseView
 */
var DatePickerView = TextEditorBaseView.extend(/** @lends DatePickerView.prototype */{

    template: InfinniUI.Template["new/controls/datePicker/template/datePicker.tpl.html"],

    UI: _.extend({}, TextEditorBaseView.prototype.UI, {
        dropdown: '.pl-datepicker-calendar'
    }),

    events: _.extend({}, TextEditorBaseView.prototype.events, {
        'focus .pl-datepicker-input': 'onFocusControlHandler',
        'mouseenter .pl-datepicker-input': 'onMouseenterControlHandler',
        'click .pl-datepicker-calendar': 'onClickDropdownHandler'
    }),

    initialize: function () {
        TextEditorBaseView.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
        this.applyDataPickerStrategy(this.model.get('mode'));
        this.listenTo(this.model, 'change:mode', this.onChangeModeHandler);
    },

    render: function () {
        this.prerenderingActions();
        this.renderTemplate(this.getTemplate());
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
            multiline: false,
            convert: function (value) {
                return InfinniUI.DateUtils.toISO8601(value);
            }
        });

        return this;
    },

    initOnChangeHandler: function () {
        TextEditorBaseView.prototype.initOnChangeHandler.call(this);

        this
            .listenTo(this.model, 'change:minValue', this.onChangeMinValueHandler)
            .listenTo(this.model, 'change:maxValue', this.onChangeMaxValueHandler)
            .listenTo(this.model, 'change:enabled', this.OnChangeEnabledHandler);
    },

    onChangeMinValueHandler: function (model, value) {

    },

    onChangeMaxValueHandler: function (model, value) {

    },

    onChangeIncrementHandler: function (model, value) {

    },

    OnChangeEnabledHandler: function (model, enabled) {
        this.ui.dropdown.prop('disabled', !enabled);
    },

    onChangeModeHandler: function (model, value) {
        this.applyDataPickerStrategy(value);
    },

    applyDataPickerStrategy: function (mode) {
        _.extend(this, datePickerStrategy[mode]);
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
    },


    getTemplate: function () {
        throw new Error('Не перекрыт getTemplate');
    },

    onClickDropdownHandler: function (event) {}

});
