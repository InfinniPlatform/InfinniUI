var DatePickerView = ControlView.extend({
    className: 'pl-datePicker',

    templates: {
        date: InfinniUI.Template["controls/datePicker/template/datepicker.tpl.html"],
        datetime: InfinniUI.Template["controls/datePicker/template/datetimepicker.tpl.html"],
        time: InfinniUI.Template["controls/datePicker/template/timepicker.tpl.html"]
    },

    UI: {
        control: 'input.datePicker, input.datetimepicker, input.timepicker',
        editor: '.pl-control-editor'
    },

    events: {
        //Обработчик для показа поля редактирования с использованием маски ввода
        "focus .datePicker": 'onFocusControlHandler',
        "focus .datetimepicker": 'onFocusControlHandler',
        "focus .timepicker": 'onFocusControlHandler',
        'focusin .pl-control-editor' : 'onFocusInDebounceHandler',
        'focusout .pl-control-editor' : 'onFocusOutDebounceHandler'
    },

    initialize: function () {
        ControlView.prototype.initialize.apply(this);
        this.on('editor:show', this.hideDatePickerHandler);
        this.on('editor:hide', this.showDatePickerHandler);
        this.onFocusInDebounceHandler = _.debounce(this.onFocusInHandler, 100);
        this.onFocusOutDebounceHandler = _.debounce(this.onFocusOutHandler, 100);

        this.updateMode();
        this.listenTo(this.model, 'change:mode', this.updateMode);
        this.listenTo(this.model, 'change:value', this.updateValue);
        this.listenTo(this.model, 'change:readonly', this.updateReadOnly);
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
        this.updateReadOnly();
        this.updateMinDate();
        this.updateMaxDate();

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

    updateReadOnly: function () {
        var readonly = this.model.get('readonly');

        if (this.wasRendered) {
            this.setReadOnlyOnPicker(readonly);
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

        if(typeof value == 'string'){
            if(minDate instanceof Date){
                minDate = this.dateToString(minDate);
            }
            if(maxDate instanceof Date){
                maxDate = this.dateToString(maxDate);
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

    dateToString: function(value){
        if(value instanceof Date){
            var day = value.getDate().toString(),
                mounth = (value.getMonth()+1).toString();
            if(day.length == 1){
                day = '0' + day;
            }
            if(mounth.length == 1){
                mounth = '0' + mounth;
            }
            return value.getFullYear() + '-' + mounth + '-' + day;
        }else{
            return value;
        }
    },

    dateTimeToString: function(value){
        if(value instanceof Date){
            var day = value.getDate().toString(),
                mounth = (value.getMonth()+1).toString(),
                hour = value.getHours().toString(),
                minute = value.getMinutes().toString(),
                second = value.getSeconds().toString();

            if(day.length == 1){
                day = '0' + day;
            }
            if(mounth.length == 1){
                mounth = '0' + mounth;
            }
            if(hour.length == 1){
                hour = '0'+hour;
            }
            if(second.length == 1){
                second = '0'+second;
            }
            if(minute.length == 1){
                minute = '0'+minute;
            }
            return value.getFullYear() + '-' + mounth + '-' + day + 'T' + hour + ':' + minute + ':'+second;
        }else{
            return value;
        }
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


    onFocusInHandler: function (event) {
        this.callEventHandler('OnGotFocus');
    },

    onFocusOutHandler: function (event) {
        this.callEventHandler('OnLostFocus');
    }


});

var pickersStrategy = {
    'Date': {
        renderControl: function(){
            this.$el
                .html(this.templates.date({}));

            this.bindUIElements();
            this.initEditor();

            this.$el.find('.date').datepicker({
                autoclose: true,
                format: "dd.mm.yyyy",
                language: InfinniUI.config.lang.substr(0, 2),
                todayHighlight: true
            });
        },

        hideDatePicker: function () {
            //@TODO Иначе скрыть всплывающий календарь плагина bootstrap-datepicker, при получении фокуса не получиться
            var control = this.$('.date');
            setTimeout(function () {
                control.datepicker('hide');
            }, 10);
        },

        initOnUiValueChangeHandler: function(){
            var $datePicker = this.$el.find('.date'),
                self = this;

            $datePicker.on('changeDate', function(e){
                if(e.date) {
                    var newVal = self.dateToString(e.date);
                    if (newVal != self.model.get('value')) {
                        self.model.set('value', newVal);
                    }
                }
            });
        },

        setValueOnPicker: function(value){
            var self = this,
                $datePicker = this.$el.find('.date');
            if(value instanceof Date){
                setTimeout(function(){
                    self.model.set('value', self.dateToString(value));
                }, 50);

            } else {

                var currentDate = this.dateToString($datePicker.datepicker('getDate'));
                currentDate = currentDate && currentDate.indexOf('NaN') > -1 ? '' : currentDate;

                if (typeof value == 'string' && value != '') {
                    if (value == currentDate) {
                        return;
                    }

                    if(value.length < 10){
                        setTimeout(function(){
                            self.model.set('value', null);
                        }, 50);
                        value = '';
                    }else{
                        value = new Date(value);
                    }

                }
                $datePicker.datepicker('setDate', value);
            }
        },

        setReadOnlyOnPicker: function(readonly){
            var $datePickerInnerNodes = this.$el.find('button, input');

            $datePickerInnerNodes.removeAttr('disabled');

            if (readonly) {
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
            this.$el
                .html(this.templates.datetime({}));

            this.bindUIElements();
            this.initEditor();

            this.$el.find('.form_datetime').datetimepicker({
                autoclose: true,
                format: "dd.mm.yyyy - hh:ii",
                language: InfinniUI.config.lang.substr(0, 2),
                pickerPosition: "bottom-left"
            });
        },

        hideDatePicker: function () {
            //@TODO Скрыть плагин

        },

        initOnUiValueChangeHandler: function(){
            var $picker = this.$el.find('.form_datetime'),
                self = this;

            $picker.on('changeDate', function(e){
                var newVal = self.dateTimeToString(timezoneDate(e.date));
                if(e.date && newVal != self.model.get('value')){
                    self.model.set('value', newVal);
                }
            });
        },

        setValueOnPicker: function(value){
            var self = this,
                $picker = this.$el.find('.form_datetime');
            if(value instanceof Date){
                self.model.set('value', self.dateTimeToString(value));
            } else if (typeof value == 'string' && value != '') {
                $picker.data('datetimepicker').setDate(timezoneDate(value));
                self.model.set('value', value);
            }else{
                $picker.datetimepicker('update');
                this.model.set('value', null);
            }
        },

        setReadOnlyOnPicker: function(readonly){
            var $datePickerInnerNodes = this.$el.find('.open-button .form-control');

            if (readonly){
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
            this.$el
                .html(this.templates.time({}));

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
                //var value = self.model.get('value');
                var value = new Date(0);
                value.setMinutes(e.time.minutes);
                value.setHours(e.time.hours);

                var newVal = self.dateTimeToString(value);
                if(newVal != self.model.get('value')){
                    self.model.set('value', newVal);
                }
            });
        },

        setValueOnPicker: function(value){
            var $picker = this.$el.find('.timepicker-control'),
                self = this;

            if(value instanceof Date){
                value = self.timeToString(value);
            }else if (typeof value =='string'){
                var date = timezoneDate(value);
                value = self.timeToString(date);
            }else{
                value = null;
            }

            $picker.timepicker('setTime', value);
        },

        setReadOnlyOnPicker: function(readonly){
            var $field = this.$el.find('.timepicker-control');
            $field.prop('disabled', readonly);
        },

        setMinDateOnPicker: function(minDate){

        },

        setMaxDateOnPicker: function(maxDate){

        }
    }
};

_.extend(DatePickerView.prototype,
    textEditorMixin
);