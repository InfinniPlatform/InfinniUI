/**
 * @class
 * @augments TextEditorBaseView
 */
var TextBoxView = TextEditorBaseView.extend(/** @lends TextBoxView.prototype */{

    template: {
        oneline: InfinniUI.Template["new/controls/textBox/template/textBoxInput.tpl.html"],
        multiline: InfinniUI.Template["new/controls/textBox/template/textBoxArea.tpl.html"]
    },

    UI: _.extend({}, TextEditorBaseView.prototype.UI, {
        hintText: '.pl-control-hint-text',
        warningText: '.pl-control-warning-text',
        errorText: '.pl-control-error-text'
    }),

    events: _.extend({}, TextEditorBaseView.prototype.events, {
        //Отображение поля редактирования для INPUT[TEXT]
        'focus .pl-text-box-input': 'onFocusControlHandler',
        'mouseenter .pl-text-box-input': 'onMouseenterControlHandler',

        //Отображение поля редактирования для TEXTAREA
        'focus .pl-text-area-input': 'onFocusControlHandler',
        'mouseenter .pl-text-area-input': 'onMouseenterControlHandler'
    }),

    initialize: function (options) {
        ControlView.prototype.initialize.call(this, options);
        this.once('render', this.initOnChangeHandler, this);
    },

    render: function () {
        this.prerenderingActions();
        this.renderControl();
        this.trigger('render');
        this.postrenderingActions();
        return this;
    },

    renderControl: function () {
        var model = this.model;

        var data = {
            guid: model.get('guid'),
            lineCount: model.get('lineCount'),
            value: this.getDisplayValue(),
            hintText: model.get('hintText'),
            errorText: model.get('errorText'),
            warningText: model.get('warningText'),
            labelText: model.get('labelText'),
            enabled: model.get('enabled')
        };

        var template = model.get('multiline') ? this.template.multiline : this.template.oneline;

        this.$el.html(template(data));
        this.bindUIElements();

        //Рендеринг редактора
        this.renderControlEditor({
            el: this.ui.editor,
            multiline: model.get('multiline'),
            lineCount: model.get('lineCount'),
            inputType: model.get('inputType')
        });

        return this;
    },

    initOnChangeHandler: function () {

        this
            .listenTo(this.model, 'change:lineCount', this.onChangeLineCountHandler)
            .listenTo(this.model, 'change:multiline', this.onChangeMultilineHandler)
            //@TODO Изменения от TextEditorBase - вынести в TextEditorBaseView ?
            .listenTo(this.model, 'change:labelText', this.onChangeLabelTextHandler)
            .listenTo(this.model, 'change:labelFloating', this.onChangeLabelFloatingHandler)
            .listenTo(this.model, 'change:displayFormat', this.onChangeDisplayFormatHandler)
            .listenTo(this.model, 'change:editMask', this.onChangeEditMaskHandler)
            //@TODO Изменения от EditorBase - вынести в EditorBaseView
            .listenTo(this.model, 'change:hintText', this.onChangeHintTextHandler)
            .listenTo(this.model, 'change:errorText', this.onChangeErrorTextHandler)
            .listenTo(this.model, 'change:warningText', this.onChangeWarningTextHandler)
            //@TODO Изменения от Control
            .listenTo(this.model, 'change:enabled', this.onChangeEnabledHandler);
    },

    onChangeLineCountHandler: function (model, value) {
        if (!value) {
            return;
        }
        this.ui.control.prop('rows', model.get('lineCount'));
    },

    onChangeMultilineHandler: function () {
        this.renderControl();
    },

    onChangeLabelTextHandler: function () {
        this.renderControl();
    },

    onChangeLabelFloatingHandler: function () {
        this.renderControl();
    },

    onChangeDisplayFormatHandler: function ( ){
        this.renderControl();
    },

    onChangeEditMaskHandler: function () {
        this.renderControl();
    },

    onChangeHintTextHandler: function (model, value) {
        this.ui.hintText.text(value);
    },

    onChangeErrorTextHandler: function (model, value) {
        this.ui.errorText.text(value);
    },

    onChangeWarningTextHandler: function (model, value) {
        this.ui.warningText.text(value);
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
