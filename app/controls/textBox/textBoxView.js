var TextBoxView = ControlView.extend({
    className: 'pl-text-box',

    template: {
        textBox: {
            default: InfinniUI.Template["controls/textBox/template/textbox.tpl.html"],
            label: InfinniUI.Template["controls/textBox/template/label-textbox.tpl.html"]
        },
        textArea: {
            default: InfinniUI.Template["controls/textBox/template/textarea.tpl.html"],
            label: InfinniUI.Template["controls/textBox/template/label-textarea.tpl.html"]
        }
    },

    UI: {
        control: ".pl-control",
        editor: '.pl-control-editor',
        validationMessage: '.pl-control-validation-message',
        hintText: '.pl-control-hint-text'
    },

    events: {
        'change .pl-text-box-input': 'onUIChangeHandler',
        //Обработчик для показа поля редактирования с использованием маски ввода
        'focus .pl-text-box-input': 'onFocusControlHandler',
        'mouseenter .pl-text-box-input': 'onMouseenterControlHandler',

        'change .pl-text-area-input': 'onUIChangeHandler',
        //Обработчик для показа поля редактирования с использованием маски ввода
        'focus .pl-text-area-input': 'onFocusControlHandler',
        'mouseenter .pl-text-area-input': 'onMouseenterControlHandler',
        'focusin .pl-control-editor' : 'onFocusInDebounceHandler',
        'focusout .pl-control-editor' : 'onFocusOutDebounceHandler',
        'synchValue': 'synchValueHandler'
    },

    onFocusInHandler: function (event) {
        this.callEventHandler('OnGotFocus');
    },

    onFocusOutHandler: function (event) {
        this.callEventHandler('OnLostFocus');
    },

    initialize: function () {
        ControlView.prototype.initialize.apply(this);

        this.initForeground();
        this.initBackground();
        this.initTextStyle();
        this.initErrorText();
        this.initHintText();
        this.initLabelText();
        this.initHorizontalTextAlignment();

        this.onFocusInDebounceHandler = _.debounce(this.onFocusInHandler, 100);
        this.onFocusOutDebounceHandler = _.debounce(this.onFocusOutHandler, 100);

        this.listenTo(this.model, 'change:value', this.updateValue);
        this.listenTo(this.model, 'change:validationMessage', this.updateValidation);
        this.listenTo(this.model, 'change:validationState', this.updateValidation);
    },

    renderTemplate: function () {
        var multiline = this.model.get('multiline');
        var labelText = this.model.get('labelText');
        var lineCount = this.model.get('lineCount');
        var inputType = this.model.get('inputType');

        var kind = multiline ? 'textArea' : 'textBox';
        var style = typeof labelText === 'undefined' || labelText === null ? 'default' : 'label';

        var template = this.template[kind][style];
        this.$el.html(template({
            multiline: multiline,
            labelText: labelText,
            lineCount: lineCount,
            inputType: inputType
        }));

    },

    render: function () {
        this.prerenderingActions();
        this.renderTemplate();
        //if(this.model.get('multiline')) {
        //    this.$el.html(this.templateTextArea({lineCount: this.model.get('lineCount')}));
        //}else{
        //    this.$el.html(this.templateTextBox({inputType: this.model.get('inputType')}));
        //}

        this.bindUIElements();
        this.initEditor();

        this.updateValue();
        this.updateEnabled();

        this.updateBackground();
        this.updateForeground();
        this.updateTextStyle();
        this.updateErrorText();
        this.updateValidation(); //При повторном рендере, принудительно выставляем Error текст
        this.updateHintText();
        this.updateHorizontalTextAlignment();

        this.postrenderingActions();
        return this;
    },

    /**
     * Рендеринг редактора значений
     */
    initEditor: function () {
        //@TODO Возможно при отсутвии maskEdit поле редактирования использовать не надо?
        //Создание редактора значений
        var editor = this.renderEditor({
            el: this.ui.editor,
            multiline: this.model.get('multiline'),
            lineCount: this.model.get('lineCount'),
            inputType: this.model.get('inputType')
        });
    },

    updateEnabled: function () {
        ControlView.prototype.updateEnabled.apply(this);

        if (this.wasRendered) {
            var isEnabled = this.model.get('enabled'),
                $control = this.$el.find('.pl-control');

            $control.prop('disabled', !isEnabled);
        }
    },

    onUIChangeHandler: function () {
        var val = this.$el.find('.pl-control').val();

        if (val != this.model.get('value')) {
            this.model.set('value', val);
        }
    },

    updateValue: function () {
        var format = this.model.get('format');
        var value = this.model.get('value');
        var text;

        if (!this.wasRendered) {
            return;
        }

        if (typeof value !== 'undefined') {
            if (typeof format !== 'undefined' && format !== null) {
                text = format.format(value);
            } else {
                text = value;
            }
        }

        this.ui.control.val(text);

    },

    updateValidation: function () {
        var model = this.model;

        var state = model.get('validationState');
        var message = model.get('validationMessage');

        var hideMessage = _.isEmpty(message) || ['error', 'warning'].indexOf(state) === -1;

        this.ui.validationMessage.toggleClass('hidden', hideMessage);
        this.ui.validationMessage.text(message);

        //state = success, error, warning
    },

    onEditorValidate: function (value) {
        return true;
    }
});

_.extend(TextBoxView.prototype,
    textEditorMixin,
    horizontalTextAlignmentPropertyMixin,
    foregroundPropertyMixin,
    backgroundPropertyMixin,
    textStylePropertyMixin,
    errorTextPropertyMixin,
    hintTextPropertyMixin,
    labelTextPropertyMixin
);