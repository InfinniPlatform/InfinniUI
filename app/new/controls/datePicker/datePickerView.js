/**
 * @class
 * @augments TextEditorBaseView
 */
var DatePickerView = TextEditorBaseView.extend(/** @lends DatePickerView.prototype */{

    className: "pl-datepicker form-group",

    template: InfinniUI.Template["new/controls/datePicker/template/datePicker.tpl.html"],

    UI: _.extend({}, TextEditorBaseView.prototype.UI, {
        dropdownButton: '.pl-datepicker-calendar',
        controlWrap: '.control-wrap',
        editorWrap: '.editor-wrap'
    }),

    events: _.extend({}, TextEditorBaseView.prototype.events, {
        'focus .pl-datepicker-input': 'onFocusControlHandler',
        'mouseenter .pl-datepicker-input': 'onMouseenterControlHandler',
        'click .pl-datepicker-calendar': 'onClickDropdownHandler'
    }),

    initialize: function () {
        TextEditorBaseView.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
        this.updateMode();
        this.listenTo(this.model, 'change:mode', this.updateMode);
    },

    initHandlersForProperties: function(){
        TextEditorBaseView.prototype.initHandlersForProperties.call(this);

        this.listenTo(this.model, 'change:minValue', this.updateMinValue);
        this.listenTo(this.model, 'change:maxValue', this.updateMaxValue);
    },

    updateProperties: function(){
        TextEditorBaseView.prototype.updateProperties.call(this);
    },

    updateMode: function(){
        var mode = this.model.get('mode');
        _.extend(this, datePickerStrategy[mode]);

        this.rerender();
    },

    updateMinValue: function(){
        var mode = this.model.get('mode');
        _.extend(this, datePickerStrategy[mode]);

        this.rerender();
    },

    updateMaxValue: function(){
        var mode = this.model.get('mode');
        _.extend(this, datePickerStrategy[mode]);

        this.rerender();
    },

    updateEnabled: function(){
        TextEditorBaseView.prototype.updateEnabled.call(this);

        var isEnabled = this.model.get('enabled');
        this.ui.dropdownButton.prop('disabled', !isEnabled);
    },

    render: function () {
        this.prerenderingActions();

        this.renderTemplate(this.getTemplate());
        this.updateProperties();
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
