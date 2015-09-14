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
    },

    /** DatePicker **/
    getTemplate: function () {
        return InfinniUI.Template["new/controls/datePicker/template/datePicker.tpl.html"];
    },

    onClickDropdownHandler: function (event) {
        var calendar = new DatePickerDropdown({
            model: this.model
        });
        calendar.render();
        //@TODO Переделать
        $('body').append(calendar.$el);

        calendar.$el.css({
            top: event.clientY,
            left: event.clientX
        });

        this.listenTo(calendar, 'date', function (date) {
            //console.log('selected date:', date);
            //
            this.model.set('value', InfinniUI.DateUtils.toISO8601(date));
        });
    },

    /** DateTimePicker **/

    onClickDropdownHandler: function (event) {
        var calendar = new DateTimePickerDropdown({
            model: this.model
        });
        calendar.render();
        //@TODO Переделать
        $('body').append(calendar.$el);

        calendar.$el.css({
            top: event.clientY,
            left: event.clientX
        });

        this.listenTo(calendar, 'date', function (date) {
            //console.log('selected date:', date);
            //
            this.model.set('value', InfinniUI.DateUtils.toISO8601(date));
        });
    },

    /** TimePicker **/

    onClickDropdownHandler: function (event) {
        var calendar = new TimePickerDropdown({
            model: this.model
        });
        calendar.render();
        //@TODO Переделать
        $('body').append(calendar.$el);

        calendar.$el.css({
            top: event.clientY,
            left: event.clientX
        });

        this.listenTo(calendar, 'date', function (date) {
            this.model.set('value', InfinniUI.DateUtils.toISO8601(date));
        });
    }


});
