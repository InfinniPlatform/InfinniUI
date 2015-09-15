var DatePickerTimeModel = DatePickerComponentModel.extend({

    defaults: {
        today: moment().toDate(),
        hour: moment().hour(),
        minute: moment().minute(),
        second: moment().second(),
        millisecond: moment().millisecond()
    },

    initialize: function () {
        DatePickerComponentModel.prototype.initialize.call(this);
        this.on('change:hour', this.updateDatePart.bind(this, 'hour'));
        this.on('change:minute', this.updateDatePart.bind(this, 'minute'));
        this.on('change:second', this.updateDatePart.bind(this, 'second'));
        this.on('change:millisecond', this.updateDatePart.bind(this, 'millisecond'));
    },

    nextHour: function () {
        var hour = this.get('hour');
        hour += 1;

        var value = moment().set({
            hour: hour,
            minute: this.get('minute'),
            second: this.get('second'),
            millisecond: this.get('millisecond')
        });


        //@TODO Границу использовать в зависимости от 12/24 формата записи даты из настроек локализации
        if (hour < 24) {
            this.set('hour', hour, {validate: true});
        }

    },

    prevHour: function () {
        var hour = this.get('hour');
        hour -= 1;

        if (hour >= 0) {
            this.set('hour', hour, {validate: true});
        }
    },

    nextMinute: function () {
        var minute = this.get('minute');
        minute += 1;

        if (minute < 60) {
            this.set('minute', minute, {validate: true});
        }

    },

    prevMinute: function () {
        var minute = this.get('minute');
        minute -= 1;

        if (minute >= 0) {
            this.set('minute', minute, {validate: true});
        }
    },

    validate: function (attr, options) {
        var value = moment().set({
            hour: attr.hour,
            minute: attr.minute,
            second: attr.second,
            millisecond: attr.millisecond
        });

        if (!this.checkRange(value)) {
            return 'Out of range';
        }
    },

    checkRange: function (value) {
        var min = this.get('min'),
            max = this.get('max'),
            success = true;

        var mMin = moment(min),
            mMax = moment(max),
            mVal = moment(value);

        [mMin, mMax].forEach(function (val) {
            val.set({
                year: mVal.year(),
                month: mVal.month(),
                date: mVal.date()
            });
        });


        if (!isEmpty(min) && !isEmpty(max)) {
            success = mVal.isBetween(min, max, 'minute') || mVal.isSame(mMin, 'minute') || mVal.isSame(mMax, 'minute');
        } else if (!isEmpty(min) && isEmpty(max)) {
            success = mMin.isBefore(value, 'minute') || mMin.isSame(value, 'minute');
        } else if (isEmpty(min) && !isEmpty(max)) {
            success = mMax.isAfter(value, 'minute') || mMax.isSame(value, 'minute');
        }

        return success;

        function isEmpty(value) {
            return typeof value === 'undefined' || _.isEmpty(value);
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
        "click .time-segment-minute": "selectMinute",
        "click .days": "selectDay"
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
            date = model.get('date'),
            hour = model.get('hour'),
            minute = model.get('minute'),
            second = model.get('second');

        date.setHours(hour, minute, second);
        this.trigger('hour', date);
    },

    selectMinute: function () {
        var
            model = this.model,
            date = model.get('date'),
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
    },

    selectDay: function () {
        var
            date = this.model.get('date');

        this.trigger('day', date);

    }

});
