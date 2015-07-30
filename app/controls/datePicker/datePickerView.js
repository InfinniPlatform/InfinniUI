var DatePickerView = ControlView.extend({
    className: 'pl-datePicker',

    templates: {
        date: InfinniUI.Template["controls/datePicker/template/datepicker.tpl.html"],
        datetime: InfinniUI.Template["controls/datePicker/template/datetimepicker.tpl.html"],
        time: InfinniUI.Template["controls/datePicker/template/timepicker.tpl.html"],
        labeldate: InfinniUI.Template["controls/datePicker/template/label-datepicker.tpl.html"],
        labeldatetime: InfinniUI.Template["controls/datePicker/template/label-datetimepicker.tpl.html"],
        labeltime: InfinniUI.Template["controls/datePicker/template/label-timepicker.tpl.html"]
    },

    UI: {
        control: 'input.datePicker, input.datetimepicker, input.timepicker',
        editor: '.pl-control-editor',
        hintText: '.pl-control-hint-text',
        validationMessage: '.pl-control-validation-message'
    },

    events: {
        //Обработчик для показа поля редактирования с использованием маски ввода
        'focus .datePicker': 'onFocusControlHandler',
        'focus .datetimepicker': 'onFocusControlHandler',
        'focus .timepicker': 'onFocusControlHandler',
        'mouseenter .datePicker': 'onMouseenterControlHandler',
        'mouseenter .datetimepicker': 'onMouseenterControlHandler',
        'mouseenter .timepicker': 'onMouseenterControlHandler',
        'focusin .pl-control-editor' : 'onFocusInDebounceHandler',
        'focusout .pl-control-editor' : 'onFocusOutDebounceHandler'
    },

    initialize: function () {
        ControlView.prototype.initialize.apply(this);

        this.initHorizontalTextAlignment();
        this.initForeground();
        this.initBackground();
        this.initTextStyle();
        this.initHintText();
        this.initErrorText();

        this.on('editor:show', this.hideDatePickerHandler);
        this.on('editor:hide', this.showDatePickerHandler);
        this.onFocusInDebounceHandler = _.debounce(this.onFocusInHandler, 100);
        this.onFocusOutDebounceHandler = _.debounce(this.onFocusOutHandler, 100);

        this.updateMode();
        this.listenTo(this.model, 'change:mode', this.updateMode);
        this.listenTo(this.model, 'change:value', this.updateValue);
        this.listenTo(this.model, 'change:validationMessage', this.updateValidation);
        this.listenTo(this.model, 'change:validationState', this.updateValidation);
        this.listenTo(this.model, 'change:enabled', this.applyEnabled);
        this.listenTo(this.model, 'change:minDate', this.updateMinDate);
        this.listenTo(this.model, 'change:maxDate', this.updateMaxDate);
    },

    hideDatePickerHandler: function () {
        if (typeof this.hideDatePicker !== 'undefined') {
            this.hideDatePicker();
        }
    },

    showDatePickerHandler: function () {
        if (typeof this.showDatePicker !== 'undefined') {
            this.showDatePicker();
        }
    },

    render: function () {
        this.prerenderingActions();
        this.renderControl();

        this.initOnUiValueChangeHandler();
        this.updateValue();
        this.applyEnabled();
        this.updateMinDate();
        this.updateMaxDate();

        this.updateHorizontalTextAlignment();
        this.updateForeground();
        this.updateBackground();
        this.updateTextStyle();
        this.updateErrorText();
        this.updateValidation(); //При повторном рендере, принудительно выставляем Error текст
        this.updateHintText();

        this.postrenderingActions();
        return this;
    },

    updateMode: function () {
        var mode = this.model.get('mode');

        _.extend(this, pickersStrategy[mode]);
    },

    updateValue: function () {
        var value = this.model.get('value');

        if (this.wasRendered && this.inAllowableRange(value)) {
            this.setValueOnPicker(value);
        }
    },

    applyEnabled: function () {
        var enabled = this.model.get('enabled');
        if (this.wasRendered) {
            this.setEnabledOnPicker(enabled);
        }
    },

    updateMinDate: function () {
        if (this.wasRendered) {
            var minDate = this.model.get('minDate');
            this.setMinDateOnPicker(minDate);
        }
    },

    updateMaxDate: function () {
        if (this.wasRendered) {
            var maxDate = this.model.get('maxDate');
            this.setMaxDateOnPicker(maxDate);
        }
    },

    inAllowableRange: function (value) {
        var minDate = this.model.get('minDate');
        var maxDate = this.model.get('maxDate');

        if (typeof value === 'undefined' || value === null) {
            return true;
        } else {
            if (typeof value === 'string') {
                value = new Date(value);
            }
        }

        if (minDate && value < minDate)
            return false;

        if (maxDate && value > maxDate)
            return false;

        return true;
    },

    isValidDate: function (value) {
        return ((value instanceof Date) && (!isNaN(value.getTime()))) || (typeof value == 'string' && value.length == 10);
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
        //@TODO Добавить проверку указанной даты на валидность
        return this.inAllowableRange(value);
    },

    timeToString: function(value){
        if(value instanceof Date){
            var hours = value.getHours().toString(),
                minutes = value.getMinutes().toString();

            if(hours.length == 1){
                hours = '0' + hours;
            }
            if(minutes.length == 1){
                minutes = '0' + minutes;
            }
            return hours + ':' + minutes;
        }else{
            return value;
        }
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

    onFocusInHandler: function (event) {
        this.callEventHandler('OnGotFocus');
    },

    onFocusOutHandler: function (event) {
        this.callEventHandler('OnLostFocus');
    },

    datePickerZindex: function(){
        var zIndex = [];
        _.each($('.modal-scrollable'), function (el) {
            var num = parseInt($(el).css("z-index"));
            if(num){
                zIndex.push(num);
            }
        });
        return Math.max.apply(Math, zIndex) + 1;
    }
});

var pickersStrategy = {
    'Date': {
        renderControl: function(){
            var labelText = this.model.get('labelText');
            var format = this.model.get('format');
            if(!format){
                format = "dd.mm.yyyy";
            }else{
                format = format.formatRule;
            }

            if(typeof labelText === 'undefined' || labelText === null){
                this.$el.html(this.templates.date({}));
            }else{
                this.$el.html(this.templates.labeldate({
                    labelText: labelText
                }));
            }

            this.bindUIElements();
            this.initEditor();
            var self = this;

            this.$el.find('.date').datepicker({
                autoclose: true,
                format: format,
                language: InfinniUI.config.lang.substr(0, 2),
                todayHighlight: true
            }).on('show', function(e){
                var $elem = $('.modal-open > .datepicker');
                var zIndexStyle = 'z-index:'+ self.datePickerZindex() +' !important';
                if($elem.attr('style').indexOf(zIndexStyle) <= 0) {
                    $elem.attr('style', $elem.attr('style') + zIndexStyle);
                }
            });
        },

        hideDatePicker: function () {
            //@TODO Иначе скрыть всплывающий календарь плагина bootstrap-datepicker, при получении фокуса не получиться
            //var control = this.$('.date');
            //setTimeout(function () {
            //    control.datepicker('hide');
            //}, 10);
        },

        initOnUiValueChangeHandler: function(){
            var $datePicker = this.$el.find('.date'),
                self = this;

            $datePicker.on('changeDate', function(e){
                if(e.date) {
                    var newVal = InfinniUI.DateUtils.toISO8601(e.date);
                    if (! self.isEqualDate(newVal, self.model.get('value'))) {
                        self.model.set('value', newVal);
                    }
                }
            });
        },

        isEqualDate: function(d1, d2){
            if(d1 == d2){
                return true;
            }

            if(typeof(d1) == 'string' && typeof(d2) == 'string'){
                return d1.substr(0, 10) == d2.substr(0, 10);
            }

            return false;
        },

        /**
         * @description Установка даты в плагине календаря
         * @param {String} value
         */
        setValueOnPicker: function(value){
            var self = this,
                date,
                current,
                $datePicker = this.$el.find('.date');

            if (typeof value === 'undefined' || value === null) {
                $datePicker.datepicker('setDate', null);
            } else {
                date = new Date(value);
                $datePicker.datepicker('setDate', date);
            }
        },

        setEnabledOnPicker: function (enabled) {
            var $datePickerInnerNodes = this.$el.find('button, input');

            $datePickerInnerNodes.removeAttr('disabled');

            if (!enabled) {
                $datePickerInnerNodes.attr('disabled', 'disabled');
            }
        },

        setMinDateOnPicker: function(minDate){
            var $datePicker = this.$el.find('.date');
            $datePicker.datepicker('setStartDate', minDate);
        },

        setMaxDateOnPicker: function(maxDate){
            var $datePicker = this.$el.find('.date');
            $datePicker.datepicker('setEndDate', maxDate);
        }
    },

    //----------
    'DateTime': {
        renderControl: function(){
            var labelText = this.model.get('labelText');
            var format = this.model.get('format');
            if(!format){
                format = "dd.mm.yyyy - hh:ii";
            }else{
                format = format.formatRule;
            }

            if(typeof labelText === 'undefined' || labelText === null){
                this.$el.html(this.templates.datetime({}));
            }else{
                this.$el.html(this.templates.labeldatetime({
                    labelText: labelText
                }));
            }

            this.bindUIElements();
            this.initEditor();
            var self = this;

            this.$el.find('.form_datetime').datetimepicker({
                autoclose: true,
                format: format,
                language: InfinniUI.config.lang.substr(0, 2),
                pickerPosition: "bottom-left"
            }).on('show', function(e){
                var $elem = $('.modal-open > .datetimepicker');
                var zIndexStyle = 'z-index:'+self.datePickerZindex()+' !important';
                if($elem.attr('style').indexOf(zIndexStyle) <= 0) {
                    $elem.attr('style', $elem.attr('style') + zIndexStyle);
                }
            });
        },

        hideDatePicker: function () {
            //@TODO Скрыть плагин

        },

        initOnUiValueChangeHandler: function(){
            var $picker = this.$el.find('.form_datetime'),
                self = this;

            $picker.on('changeDate', function(e){
                if(e.date){
                    var d = new Date();
                    //Костыль для плагина bootstrap-datetimepicker, т.к. этот плагин удаляет временную зону
                    var date = new Date(e.date.getTime() + d.getTimezoneOffset() * 60000);
                    var newVal = InfinniUI.DateUtils.toISO8601(date);
                    self.model.set('value', newVal);
                }
            });
        },

        /**
         * @description Установка даты в плагине календаря
         * @param {String} value
         */
        setValueOnPicker: function(value){
            var self = this,
                $picker = this.$el.find('.form_datetime');

            if (typeof value === 'undefined' || value === null) {
                this.$('.datetimepicker').val('');
                $picker.datetimepicker('update');
            } else {
                var date = new Date(value);
                $picker.data('datetimepicker').setDate(date);
            }
        },

        setEnabledOnPicker: function (enabled) {
            var $datePickerInnerNodes = this.$el.find('.open-button .form-control');

            if (!enabled){
                $datePickerInnerNodes.attr('disabled', 'disabled');
            }else{
                $datePickerInnerNodes.removeAttr('disabled');
            }
        },

        setMinDateOnPicker: function(minDate){
            var $datePicker = this.$el.find('.date');
            $datePicker.datetimepicker('setStartDate', minDate);
        },

        setMaxDateOnPicker: function(maxDate){
            var $datePicker = this.$el.find('.date');
            $datePicker.datetimepicker('setEndDate', maxDate);
        }
    },

    //----------
    'Time': {
        renderControl: function(){
            var labelText = this.model.get('labelText');

            if(typeof labelText === 'undefined' || labelText === null){
                this.$el.html(this.templates.time({}));
            }else{
                this.$el.html(this.templates.labeltime({
                    labelText: labelText
                }));
            }

            this.bindUIElements();
            this.initEditor();

            var $control = this.$el.find('.timepicker-control');

            $control.timepicker({
                autoclose: true,
                minuteStep: 5,
                showSeconds: false,
                showMeridian: false
            });

            this.$el.find('.open-picker').click(function(){
                $control.timepicker('showWidget');
            });
        },

        hideDatePicker: function () {
            //@TODO Скрыть плагин
            var control = this.$(".timepicker-control");

            setTimeout(function () {
                control.timepicker('hideWidget');
            }, 42);
        },

        initOnUiValueChangeHandler: function(){
            var $picker = this.$el.find('.timepicker-control'),
                self = this;

            $picker.on('changeTime.timepicker', function(e) {
                var value = self.model.get('value');
                if (typeof value === 'undefined' || value === null) {
                    value = new Date(0);
                }
                value = new Date(value);
                value.setMinutes(e.time.minutes);
                value.setHours(e.time.hours);

                self.model.set('value', InfinniUI.DateUtils.toISO8601(value));
            });
        },

        /**
         * @description Установка даты в плагине календаря
         * @param {String} value
         */
        setValueOnPicker: function(value){
            var $picker = this.$el.find('.timepicker-control'),
                self = this;

            var date = null;

            if (typeof value === 'undefined' || value === null) {

            } else {
                date = new Date(value);
            }

            $picker.timepicker('setTime', date);
        },

        setEnabledOnPicker: function (enabled) {
            var $field = this.$el.find('.timepicker-control');
            $field.prop('disabled', !enabled);
        },

        setMinDateOnPicker: function(minDate){

        },

        setMaxDateOnPicker: function(maxDate){

        }
    }
};

_.extend(DatePickerView.prototype,
    textEditorMixin,
    foregroundPropertyMixin,
    backgroundPropertyMixin,
    textStylePropertyMixin,
    horizontalTextAlignmentPropertyMixin,
    hintTextPropertyMixin,
    errorTextPropertyMixin,
    labelTextPropertyMixin
);