var NumericBoxView = ControlView.extend({
    className: 'pl-numeric-box',

    template: InfinniUI.Template["controls/numericBox/template/numericbox.tpl.html"],

    UI: {
        control: '.pl-spin-control',
        input: '.pl-spin-input',
        editor: '.pl-control-editor',
        hintText: '.pl-control-hint-text',
        buttonMin: '.nm-min',
        buttonMax: '.nm-max'
    },

    events: {
        //Обработчик для показа поля редактирования с использованием маски ввода
        'focus .pl-spin-input': 'onFocusControlHandler',
        'focusin .pl-control-editor' : 'onFocusInDebounceHandler',
        'focusout .pl-control-editor' : 'onFocusOutDebounceHandler',
        'click .nm-min' : 'onClickDecrementHandler',
        'click .nm-max' : 'onClickIncrementHandler'
    },

    initialize: function () {
        ControlView.prototype.initialize.apply(this);

        this.initHorizontalTextAlignment();
        this.initForeground();
        this.initBackground();
        this.initTextStyle();
        this.initHintText();

        this.onFocusInDebounceHandler = _.debounce(this.onFocusInHandler, 100);
        this.onFocusOutDebounceHandler = _.debounce(this.onFocusOutHandler, 100);

        this.listenTo(this.model, 'change:value', this.updateValue);
        this.listenTo(this.model, 'change:minValue', this.updateMinValue);
        this.listenTo(this.model, 'change:maxValue', this.updateMaxValue);
        this.listenTo(this.model, 'change:readOnly', this.updateReadOnly);
        this.listenTo(this.model, 'change:increment', this.updateIncrement);
        this.listenTo(this.model, 'change:enabled', this.updateEnabled);
    },

    render: function () {
        this.prerenderingActions();

        this.$el.html(this.template({}));

        this.bindUIElements();
        this.initEditor();

        this.updateBackground();
        this.updateForeground();
        this.updateTextStyle();
        this.updateHintText();
        this.updateHorizontalTextAlignment();

        this.updateValue();
        this.updateMaxValue();
        this.updateMinValue();
        this.updateIncrement();
        this.updateEnabled();

        this.postrenderingActions();
        return this;
    },

    updateEnabled: function () {
        if (this.wasRendered) {
            var isEnabled = this.model.get('enabled');
            this.ui.input.prop('disabled', !isEnabled);
            this.$el.find('button').prop('disabled', !isEnabled);
            (!isEnabled) ? this.$el.addClass('disabled') : this.$el.removeClass('disabled');
        }
    },

    updateReadOnly: function () {
        if (this.wasRendered) {
            if (this.model.get('enabled')) {
                var readOnly = this.model.get('readOnly');
                this.ui.input.prop('disabled', readOnly);
                this.$el.find('button').prop('disabled', readOnly);
                (readOnly) ? this.$el.addClass('disabled') : this.$el.removeClass('disabled');
            }
        }
    },

    onClickDecrementHandler: function(){
        var value = this.model.get('value');
        var increment = this.model.get('increment');

        value = parseInt(value) - parseInt(increment);

        this.model.set('value', value);
    },

    onClickIncrementHandler: function(){
        var value = this.model.get('value');
        var increment = this.model.get('increment');

        value = parseInt(value) + parseInt(increment);

        this.model.set('value', value);
    },

    updateValue: function () {
        var value = this.model.get('value');
        var min = this.model.get('minValue');
        var max = this.model.get('maxValue');
        var format = this.model.get('format');
        var text;

        if(typeof max !== 'undefined' && value  > max) {
            value = max;
        }
        if(typeof min !== 'undefined' && value < min){
            value = min;
        }

        if (typeof value !== 'undefined') {
            if (typeof format !== 'undefined' && format !== null) {
                text = format.format(value);
            } else {
                text = value;
            }
        }

        if(this.model.get('value') != value){
            this.model.set('value', value);
        }


        if (this.wasRendered) {
            this.ui.input.val(text);
        }
    },

    updateIncrement: function () {
        if (this.wasRendered) {
            var increment = this.model.get('increment');

            if (increment === 0){
                increment = 1;
            }

            this.model.set('increment', increment);
        }
    },

    updateMinValue: function () {
        if (this.wasRendered) {
            var min = this.model.get('minValue');
            var value = this.model.get('value');

            if(value < min){
                value = min;
            }

            this.model.set('value', value);
        }
    },

    updateMaxValue: function () {
        if (this.wasRendered) {
            var max = this.model.get('maxValue');
            var value = this.model.get('value');

            if(value > max){
                value = max;
            }

            this.model.set('value', value);
        }
    },

    /**
     * Рендеринг редактора значений
     */
    initEditor: function () {
        //Создание редактора значений
        var editor = this.renderEditor({
            el: this.ui.editor
        });

    },

    onEditorConvertValue: function (value) {
        if (value === '' || value === null || typeof value === 'undefined') {
            return undefined;
        }
        return parseInt(value, 10);
    },

    /**
     * Обработчик проверки значения из поля ввода с маской
     * @param value
     * @returns {boolean}
     */
    onEditorValidate: function (value) {
        if (typeof value === 'undefined' || value === null) {
            return true;
        }

        var min = this.model.get('minValue');
        var max = this.model.get('maxValue');

        if (typeof min !== 'undefined' && min !== null && value < min) {
            return false;
        }

        if (typeof max !== 'undefined' && max !== null && value > max) {
            return false;
        }

        return true;
    },


    onFocusInHandler: function (event) {
        this.callEventHandler('OnGotFocus');
    },

    onFocusOutHandler: function (event) {
        this.callEventHandler('OnLostFocus');
    }
});

_.extend(NumericBoxView.prototype,
    textEditorMixin,
    horizontalTextAlignmentPropertyMixin,
    foregroundPropertyMixin,
    backgroundPropertyMixin,
    textStylePropertyMixin,
    hintTextPropertyMixin
);