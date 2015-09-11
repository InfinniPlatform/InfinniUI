/**
 * @class TextEditorBaseView
 * @augments ControlView
 * @mixes textEditorMixin
 * @mixed editorBaseViewMixin
 */


var TextEditorBaseView = ControlView.extend(/** @lends TextEditorBaseView.prototype */ _.extend({}, editorBaseViewMixin, {

    UI: _.extend({}, editorBaseViewMixin.UI, {
        control: '.pl-control',
        editor: '.pl-control-editor'
    }),

    events: {
        //Обработчик для показа поля редактирования с использованием маски ввода
        'focus .pl-text-box-input': 'onFocusControlHandler',
        'mouseenter .pl-text-box-input': 'onMouseenterControlHandler'

        //@TODO Генерация событий GotFocus/LostFocus должна происходить с учетом что происходит подмена контролов
    },

    initialize: function () {
        ControlView.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
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
        ControlView.prototype.initOnChangeHandler.call(this);
        editorBaseViewMixin.initOnChangeHandler.call(this);

        this
            .listenTo(this.model, 'change:labelText', this.onChangeLabelTextHandler)
            .listenTo(this.model, 'change:labelFloating', this.onChangeLabelFloatingHandler)
            .listenTo(this.model, 'change:displayFormat', this.onChangeDisplayFormatHandler)
            .listenTo(this.model, 'change:editMask', this.onChangeEditMaskHandler);
    },

    getData: function () {
        var model = this.model;

        return _.extend({},
            ControlView.prototype.getData.call(this),
            editorBaseViewMixin.getData.call(this), {
                labelText: model.get('labelText'),
                labelFloating: model.get('labelFloating'),
                value: this.getDisplayValue()
            });
    },

    onChangeLabelTextHandler: function () {

    },

    onChangeLabelFloatingHandler: function () {

    },

    onChangeDisplayFormatHandler: function () {

    },

    onChangeEditMaskHandler: function () {

    },

    onChangeValueHandler: function (model, value) {
        this.ui.control.val(this.getDisplayValue());
    },

    onEditorValidate: function (value) {
        return true;
    },

    getDisplayValue: function () {
        var
            model = this.model,
            value = model.get('value'),
            displayFormat = model.get('displayFormat');

        return displayFormat ? displayFormat.format(value) : value;
    }

}));

_.extend(TextEditorBaseView.prototype, textEditorMixin); //Работа с масками ввода