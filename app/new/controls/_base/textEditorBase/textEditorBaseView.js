/**
 * @class TextEditorBaseView
 * @augments ControlView
 * @mixes textEditorMixin
 */
var TextEditorBaseView = ControlView.extend(/** @lends TextEditorBaseView.prototype */{

    UI: {
        control: '.pl-control',
        editor: '.pl-control-editor'
    },

    events: {
        //Обработчик для показа поля редактирования с использованием маски ввода
        'focus .pl-text-box-input': 'onFocusControlHandler',
        'mouseenter .pl-text-box-input': 'onMouseenterControlHandler'

        //@TODO Генерация событий GotFocus/LostFocus должна происходить с учетом что происходит подмена контролов
    },

    initialize: function () {
        ControlView.prototype.initialize.call(this, options);
    },

    /**
     * Рендеринг редактора значений
     * @params {Object} options
     * @params {jQuery} options.el
     * @params {Number} options.multiline
     * @params {Number} options.lineCount
     * @params {String} options.inputType
     *
     */
    renderControlEditor: function (options) {

        options = _.defaults(options, {
            el: this.ui.editor,
            multiline: false,
            lineCount: 1,
            inputType: 'text'
        });

        //@TODO Возможно при отсутвии maskEdit поле редактирования использовать не надо?
        this.renderEditor(options);
    },

    initOnChangeHandler: function () {
        this
            .listenTo(this.model, 'change:labelText', this.onChangeLabelTextHandler)
            .listenTo(this.model, 'change:value', this.onChangeValue)
            .listenTo(this.model, 'change:labelFloating', this.onChangeLabelFloatingHandler)
            .listenTo(this.model, 'change:displayFormat', this.onChangeDisplayFormatHandler)
            .listenTo(this.model, 'change:editMask', this.onChangeEditMaskHandler);
    },

    onChangeLabelTextHandler: function () {

    },

    onChangeLabelFloatingHandler: function () {

    },

    onChangeDisplayFormatHandler: function ( ){
        if(this.wasRendered){
            this.updateDisplayValue();
        }
    },

    onChangeEditMaskHandler: function () {

    },

    onEditorValidate: function (value) {
        return true;
    },

    onChangeValue: function () {
        if(this.wasRendered){
            this.updateDisplayValue();
        }
    },

    updateDisplayValue: function () {
        var displayValue = this.getDisplayValue();
        this.ui.control.val(displayValue);
    },

    getDisplayValue: function () {
        var
            model = this.model,
            value = model.get('value'),
            displayFormat = model.get('displayFormat');

        return displayFormat ? displayFormat.format(value) : value;
    }


});

_.extend(TextEditorBaseView.prototype, textEditorMixin);