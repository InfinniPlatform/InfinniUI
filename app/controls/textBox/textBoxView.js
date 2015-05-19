var TextBoxView = ControlView.extend({
    className: 'pl-text-box input-icon right',

    templateTextBox: InfinniUI.Template["controls/textBox/template/textbox.tpl.html"],
    templateTextArea: InfinniUI.Template["controls/textBox/template/textarea.tpl.html"],

    UI: {
        control: ".pl-control",
        editor: '.pl-control-editor'
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
        this.listenTo(this.model, 'change:value', this.updateValue);
        this.onFocusInDebounceHandler = _.debounce(this.onFocusInHandler, 100);
        this.onFocusOutDebounceHandler = _.debounce(this.onFocusOutHandler, 100);
    },

    render: function () {
        this.prerenderingActions();

        if(this.model.get('multiline')) {
            this.$el.html(this.templateTextArea({lineCount: this.model.get('lineCount')}));
        }else{
            this.$el.html(this.templateTextBox({inputType: this.model.get('inputType')}));
        }

        this.bindUIElements();
        this.initEditor();

        this.updateValue();
        this.updateEnabled();

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

    onEditorValidate: function (value) {
        return true;
    }
});

_.extend(TextBoxView.prototype, textEditorMixin);