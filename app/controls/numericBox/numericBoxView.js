var NumericBoxView = ControlView.extend({
    className: 'pl-numeric-box',

    template: InfinniUI.Template["controls/numericBox/template/numericbox.tpl.html"],

    UI: {
        control: '.pl-spin-control',
        input: '.pl-spin-input',
        editor: '.pl-control-editor'
    },

    events: {
        'change .pl-spin-input': 'updateModelVal',
        //Обработчик для показа поля редактирования с использованием маски ввода
        "focus .pl-spin-input": 'onFocusControlHandler',
        'focusin .pl-control-editor' : 'onFocusInDebounceHandler',
        'focusout .pl-control-editor' : 'onFocusOutDebounceHandler'
    },

    initialize: function () {
        ControlView.prototype.initialize.apply(this);
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
        //@TODO Используемый плагин обязывает обязательно указывать мин и макс знаначения
        this.ui.input.TouchSpin({
            min: (typeof this.model.get('minValue') === 'undefined') ? -Number.MAX_VALUE : this.model.get('minValue'),
            max: (typeof this.model.get('maxValue') === 'undefined') ? Number.MAX_VALUE : this.model.get('maxValue')
        });
        this.initEditor();

        this.updateValue();
        this.updateMaxValue();
        this.updateMinValue();
        this.updateIncrement();
        this.updateEnabled();

        this.postrenderingActions();
        return this;
    },

    updateModelVal: function (event) {
        var val = parseInt(event.target.value, 10);
        if (isNaN(val)) {
            val = null
        } else {
            if(val > this.model.get('maxValue')){
                val = this.model.get('maxValue')
            }else if(val < this.model.get('minValue')){
                val = this.model.get('minValue')
            }
        }

        this.model.set('value', val);
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
    updateValue: function () {
        var value = this.model.get('value');
        var min = this.model.get('minValue');
        var max = this.model.get('maxValue');

        if(typeof max !== 'undefined' && value  > max) {
            value = max;
        }
        if(typeof min !== 'undefined' && value < min){
            value = min;
        }

        this.model.set('value', value);

        if (this.wasRendered) {
            this.ui.input.val(value);
            this.ui.input.trigger("touchspin.updatesettings", {initval: value});
        }
    },
    updateIncrement: function () {
        if (this.wasRendered) {
            var increment = this.model.get('increment');
            this.ui.input.trigger("touchspin.updatesettings", {step: increment});
        }
    },
    updateMinValue: function () {
        if (this.wasRendered) {
            var min = this.model.get('minValue');
            this.ui.input.trigger("touchspin.updatesettings", {min: min});
        }
    },
    updateMaxValue: function () {
        if (this.wasRendered) {
            var max = this.model.get('maxValue');
            this.ui.input.trigger("touchspin.updatesettings", {max: max});
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
    textEditorMixin
);