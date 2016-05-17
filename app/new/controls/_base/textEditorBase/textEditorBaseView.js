/**
 * @class TextEditorBaseView
 * @augments ControlView
 * @mixes textEditorMixin
 * @mixed editorBaseViewMixin
 */


var TextEditorBaseView = ControlView.extend(/** @lends TextEditorBaseView.prototype */ _.extend({}, editorBaseViewMixin, {

    UI: _.extend({}, editorBaseViewMixin.UI, {
        control: '.pl-control',
        //editor: '.pl-control-editor',
        editor: '.pl-editor',
        label: '.pl-control-label',
        textbox: '.pl-text-box-input'
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

    initHandlersForProperties: function(){
        ControlView.prototype.initHandlersForProperties.call(this);
        editorBaseViewMixin.initHandlersForProperties.call(this);

        this.listenTo(this.model, 'change:labelText', this.updateLabelText);
        this.listenTo(this.model, 'change:labelFloating', this.updateLabelFloating);
        this.listenTo(this.model, 'change:displayFormat', this.updateDisplayFormat);
        this.listenTo(this.model, 'change:editMask', this.updateEditMask);
    },

    updateProperties: function(){
        ControlView.prototype.updateProperties.call(this);
        editorBaseViewMixin.updateProperties.call(this);

        this.updateLabelText();
    },

    updateValue: function(){
        editorBaseViewMixin.updateValueState.call(this);
        this.ui.control.val(this.getDisplayValue());
    },

    updateLabelText: function(){
        var labelText = this.model.get('labelText');
        if(labelText){
            this.ui.label
                .text(labelText)
                .removeClass('hidden');
        }else{
            this.ui.label
                .text('')
                .addClass('hidden');
        }

    },

    updateDisplayFormat: function(){
        this.updateValue();
    },

    updateEditMask: function(){
        this.updateValue();
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
            lineCount: 2,
            inputType: 'text'
        });

        //@TODO Возможно при отсутвии maskEdit поле редактирования использовать не надо?
        this.renderEditor(options);
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

    onEditorValidate: function (value) {
        return true;
    },

    getDisplayValue: function () {
        var
            model = this.model,
            value = model.get('value'),
            displayFormat = model.get('displayFormat');

        return displayFormat ? displayFormat(null, {value: value}) : value;
    }

}));

//_.extend(TextEditorBaseView.prototype, textEditorMixin); //Работа с масками ввода