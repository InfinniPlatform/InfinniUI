/**
 * @class
 * @augments TextEditorBaseView
 */
var DateTimePickerView = TextEditorBaseView.extend(/** @lends DateTimePickerView.prototype */{

    className: "pl-datepicker form-group",

    template: InfinniUI.Template["controls/dateTimePicker/template/date.tpl.html"],

    templateEditor: InfinniUI.Template["new/controls/dateTimePicker/template/date.editor.tpl.html"],

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
        _.extend(this, dateTimePickerStrategy[mode]);

        this.rerender();
    },

    updateMinValue: function(){
        var mode = this.model.get('mode');
        _.extend(this, dateTimePickerStrategy[mode]);

        this.rerender();
    },

    updateMaxValue: function(){
        var mode = this.model.get('mode');
        _.extend(this, dateTimePickerStrategy[mode]);

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
        this.renderDateTimePickerEditor();

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

    renderDateTimePickerEditor: function () {
        var model = this.model;
        this.renderControlEditor(this.templateEditor.call(null, this.getData()));

        return this;
    },

    updateFocusable: function () {
        var focusable = this.model.get('focusable');

        if (!focusable) {
            this.ui.control.attr('tabindex', -1);
        } else {
            this.ui.control.removeAttr('tabindex');
        }
    },

    /**
     * Используется миксином textEditorMixin
     * @param value
     * @returns {boolean}
     */
    onEditorValidate: function (value) {
        var model = this.model;
        
        return InfinniUI.DateUtils.checkRangeDate(value, model.get('minValue'), model.get('maxValue'));
    },


    getTemplate: function () {
        throw new Error('Не перекрыт getTemplate');
    },

    onClickDropdownHandler: function (event) {}

});
