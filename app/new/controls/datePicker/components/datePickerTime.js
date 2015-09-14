var DatePickerTimeModel = DatePickerComponentModel.extend({

    defaults: {
        //todayMonth: moment().month()
        hour: moment().hour(),
        minute: moment().minute(),
        second: moment().second()
    },

    initialize: function () {
        //this.on('change:date', this.onChangeDateHandler, this);
        DatePickerComponentModel.prototype.initialize.call(this);
        this.on('change:hour', this.updateDatePart.bind(this, 'hour'));
        this.on('change:minute', this.updateDatePart.bind(this, 'minute'));
        this.on('change:second', this.updateDatePart.bind(this, 'second'));
    },

    //onChangeDateHandler: function (model, value) {
    //    if (typeof value !== 'undefined' && value !== null) {
    //        model.set('hour', moment(value).hour());
    //        model.set('minute', moment(value).minute());
    //        model.set('second', moment(value).second());
    //    } else {
    //        model.set('hour',null);
    //        model.set('minute', null);
    //        model.set('second', null);
    //    }
    //},

    nextHour: function () {
        var hour = this.get('hour');
        hour += 1;

        //@TODO Границу использовать в зависимости от 12/24 формата записи даты из настроек локализации
        if (hour < 24) {
            this.set('hour', hour);
        }

    },

    prevHour: function () {
        var hour = this.get('hour');
        hour -= 1;

        if (hour >= 0) {
            this.set('hour', hour);
        }
    },

    nextMinute: function () {
        var minute = this.get('minute');
        minute += 1;

        if (minute < 60) {
            this.set('minute', minute);
        }

    },

    prevMinute: function () {
        var minute = this.get('minute');
        minute -= 1;

        if (minute >= 0) {
            this.set('minute', minute);
        }
    }


});

var DatePickerTime = DatePickerComponent.extend({

    modelClass: DatePickerTimeModel,

    template: InfinniUI.Template["new/controls/datePicker/template/time/time.tpl.html"],

    events: {
        "click .time-spin-down.time-spin-hour": "prevHour",
        "click .time-spin-up.time-spin-hour": "nextHour",
        "click .time-spin-down.time-spin-minute": "prevMinute",
        "click .time-spin-up.time-spin-minute": "nextMinute",
        "click .time-segment-hour": "selectHour",
        "click .time-segment-minute": "selectMinute"
        /*
        "click .month": "useMonth",
        "click .today-month": "showToday"
        */
    },

    UI: {
        month: '.month',
        year: '.year',
        hour: '.time-segment-hour',
        minute: '.time-segment-minute'
    },

    render: function () {
        var template = this.template();
        this.$el.html(template);
        this.bindUIElements();
        this.updateHour();
        this.updateMinute();
        this.initOnChangeHandlers();
    },

    selectHour: function () {
        var
            model = this.model,
            date = new Date(),
            hour = model.get('hour'),
            minute = model.get('minute'),
            second = model.get('second');

        date.setHours(hour, minute, second);
        this.trigger('hour', date);
    },

    selectMinute: function () {
        var
            model = this.model,
            date = new Date(),
            hour = model.get('hour'),
            minute = model.get('minute'),
            second = model.get('second');

        date.setHours(hour, minute, second);
        this.trigger('minute', date);
    },

    initOnChangeHandlers: function () {
        this.listenTo(this.model, 'change:hour', this.updateHour);
        this.listenTo(this.model, 'change:minute', this.updateMinute);
        this.listenTo(this.model, 'change:date', this.useTime);
    },

    updateHour: function () {
        var hour = this.model.get('hour');
        this.ui.hour.text(stringUtils.padLeft(hour, 2, '0'));
    },

    updateMinute: function () {
        var minute = this.model.get('minute');
        this.ui.minute.text(stringUtils.padLeft(minute, 2, '0'));
    },

    prevHour: function () {
        this.model.prevHour();
    },

    nextHour: function () {
        this.model.nextHour();
    },

    prevMinute: function () {
        this.model.prevMinute();
    },

    nextMinute: function () {
        this.model.nextMinute();
    },

    useTime: function () {
        var
            date = this.model.get('date');

        this.trigger('date', date);
    }

});
