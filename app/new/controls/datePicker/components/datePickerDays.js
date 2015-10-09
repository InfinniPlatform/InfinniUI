var DatePickerDaysModel = DatePickerComponentModel.extend({
    defaults: function () {
        var today = moment();

        return {
            today: today.toDate(),
            todayMonth: today.month(),
            todayDay: today.date(),
            todayYear: today.year()
        }
    },

    initialize: function () {
        DatePickerComponentModel.prototype.initialize.call(this);
        this.on('change:year', this.updateDatePart.bind(this, 'year'));
        this.on('change:month', this.updateDatePart.bind(this, 'month'));
        this.on('change:day', this.updateDatePart.bind(this, 'day'));
    },

    today: function () {
        this.set({
            year: this.get('todayYear'),
            month: this.get('todayMonth')
        });
    },

    nextMonth: function () {
        var
            month = this.get('month'),
            year = this.get('year');

        this.set({
            month: month === 11 ? 0 : month + 1,
            year: month === 11 ? year + 1 : year
        });
    },

    prevMonth: function () {
        var
            month = this.get('month'),
            year = this.get('year');

        this.set({
            month: month === 0 ? 11 : month - 1,
            year: month === 0 ? year - 1 : year
        });
    },

    checkRange: function (value) {
        var min = this.get('min'),
            max = this.get('max'),
            success = true;

        var mMin = moment(min),
            mMax = moment(max),
            mVal = moment(value);

        if (!isEmpty(min) && !isEmpty(max)) {
            success = mVal.isBetween(min, max, 'day') || mVal.isSame(mMin, 'day') || mVal.isSame(mMax, 'day');
        } else if (!isEmpty(min) && isEmpty(max)) {
            success = mMin.isBefore(value, 'day') || mMin.isSame(value, 'day');
        } else if (isEmpty(min) && !isEmpty(max)) {
            success = mMax.isAfter(value, 'day') || mMax.isSame(value, 'day');
        }

        return success;

        function isEmpty(value) {
            return typeof value === 'undefined' || _.isEmpty(value);
        }

    }

});

var DatePickerDays = DatePickerComponent.extend({

    modelClass: DatePickerDaysModel,

    template: InfinniUI.Template["new/controls/datePicker/template/date/days.tpl.html"],

    UI: {
        headerDays: '.weekdays-head .day',
        calendarDays: '.day-calendar',
        year: '.years-year',
        month: '.years-month'
    },

    events: {
        'click .years': 'onYearsClickHandler',
        'click .btn-month-prev': 'prevMonth',
        'click .btn-month-next': 'nextMonth',
        'click .today-date': 'showToday',
        'click .day-calendar:not(".day-unavailable")': 'useDay',
        'click .time': 'showTime'
    },

    render: function () {
        var template = this.template();
        this.$el.html(template);
        this.bindUIElements();
        this.fillLegend();
        this.fillCalendar();
        this.initOnChangeHandlers();
    },

    initOnChangeHandlers: function () {
        this.listenTo(this.model, 'change:month', this.onChangeMonthHandler);
        this.listenTo(this.model, 'change:year', this.onChangeYearHandler);
    },

    onChangeMonthHandler: function (model, value) {
        var dateTimeFormatInfo = localized.dateTimeFormatInfo;
        this.ui.month.text(dateTimeFormatInfo.monthNames[value]);
        this.fillCalendar();
    },

    onChangeYearHandler: function (model, value) {
        this.ui.year.text(value);
        this.fillCalendar();
    },

    fillLegend: function () {
        var date = new Date();

        var dateTimeFormatInfo = localized.dateTimeFormatInfo;
        var firstDayOfWeek = dateTimeFormatInfo.firstDayOfWeek;
        var days = dateTimeFormatInfo.abbreviatedDayNames.map(function (day, i) {
            return i;
        });

        if (firstDayOfWeek > 0) {
            days = days.splice(firstDayOfWeek).concat(days);
        }

        this.ui.headerDays.each(function (i, el) {
            var $el = $(el);
            var index = days[i];
            $el.text(dateTimeFormatInfo.abbreviatedDayNames[index]);
            markWeekend($el, index);
        });

        this.ui.calendarDays.each(function (i, el) {
            var $el = $(el);
            var index = days[i % 7];
            markWeekend($el, index);
        });

        function markWeekend($el, weekday) {
            $el.toggleClass('day-weekend', weekday === 0 || weekday === 6);
        }
    },

    fillCalendar: function () {
        var model = this.model;
        var valueDate = model.get('value');
        var month = model.get('month');
        var year = model.get('year');
        var day = model.get('day');
        var min = model.get('min');
        var max = model.get('max');
        var firstDayOfMonth = new Date(year, month, 1);
        var weekday = firstDayOfMonth.getDay();
        var dateTimeFormatInfo = localized.dateTimeFormatInfo;
        var firstDayOfWeek = dateTimeFormatInfo.firstDayOfWeek;

        var startDate = new Date(year, month, 1 - weekday + firstDayOfWeek);

        this.ui.calendarDays.each(function (i, el) {
            var $el = $(el);
            var d = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);
            $el.text(d.getDate());
            $el.attr('data-date', moment(d).format('YYYY-MM-DD'));
            markActiveMonth($el, d.getMonth() === month);
            markToday($el, d);
            markSelected($el, d);
            markAvailable($el, d);
        });

        function markActiveMonth($el, active) {
            $el.toggleClass('day-inactive', !active);
        }

        function markToday($el, date) {
            var today = date.getMonth() === model.get('todayMonth')
                && date.getFullYear() === model.get('todayYear')
                && date.getDate() === model.get('todayDay');

            $el.toggleClass('day-today', today);
        }

        function markSelected($el, value) {
            var selected = false;

            if (valueDate) {
                selected = moment(valueDate).isSame(value, 'day');
            }

            $el.toggleClass('day-selected', selected);
        }

        function markAvailable($el, value) {
            $el.toggleClass('day-unavailable', !model.checkRange(value));
        }

    },

    onYearsClickHandler: function (event) {
        var date = this.model.get('date');

        this.trigger('year', date);
    },

    prevMonth: function () {
        this.model.prevMonth();
    },

    nextMonth: function () {
        this.model.nextMonth();
    },

    showToday: function () {
        this.today();
    },

    today: function () {
        this.model.today();
    },

    showTime: function () {
        this.trigger('time', this.model.get('value'));
    },

    useDay: function (event) {
        var $el = $(event.target),
            value = $el.attr('data-date'),
            m = moment(value, 'YYYY-MM-DD');

        this.model.set({
            year: m.year(),
            month: m.month(),
            day: m.date()
        });


        this.trigger('date', this.model.get('date'));
    }

});
