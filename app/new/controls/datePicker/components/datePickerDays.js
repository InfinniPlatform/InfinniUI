var DatePickerDaysModel = Backbone.Model.extend({
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
        this.on('change:date', this.onChangeDateHandler, this);
    },

    onChangeDateHandler: function (model, value) {
        if (typeof value !== 'undefined' && value !== null) {
            var date = moment(value);
            model.set('month', date.month());
            model.set('year', date.year());
            model.set('day', date.date());
        } else {
            model.set('month', null);
            model.set('year', null);
            model.set('day', null);
        }
    },

    nextMonth: function () {
        var
            month = this.get('month'),
            year = this.get('year');

        this.set({
            month: month === 11 ? 0: month + 1,
            year: month === 11 ? year + 1 : year
        });
    },

    prevMonth: function () {
        var
            month = this.get('month'),
            year = this.get('year');

        this.set({
            month: month === 0 ? 11: month - 1,
            year: month === 0 ? year - 1 : year
        });
    }

});

var DatePickerDays = DatePickerComponent.extend({

    modelClass: DatePickerDaysModel,

    template: InfinniUI.Template["new/controls/datePicker/template/date/days.tpl.html"],

    UI: {
        headerDays: '.weekdays-head .day',
        calendarDays: '.weekdays-calendar .day',
        year: '.years-year',
        month: '.years-month'
    },

    events: {
        'click .years': 'onYearsClickHandler',
        'click .btn-month-prev': 'prevMonth',
        'click .btn-month-next': 'nextMonth'
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

        this.ui.headerDays.each(function (i, el) {
            var $el = $(el);
            $el.text(dateTimeFormatInfo.abbreviatedDayNames[i]);
            markWeekend($el, i);
        });

        this.ui.calendarDays.each(function (i, el) {
            var $el = $(el);
            markWeekend($el, i % 7);
        });

        function markWeekend ($el, weekday) {
            $el.toggleClass('day-weekend', weekday === 0 || weekday === 6);
        }
    },

    fillCalendar: function () {
        var date = new Date();
        var model = this.model;
        var month = model.get('month');
        var year = model.get('year');
        var firstDayOfMonth = new Date(year, month, 1);
        var weekday = firstDayOfMonth.getDay();

        var startDate = new Date(year, month, 1 - weekday);

        this.ui.calendarDays.each(function (i, el) {
            var $el = $(el);
            var d = new Date(startDate.getFullYear(), month, startDate.getDay() + i);
            $el.text(d.getDate());
            $el.attr('data-date', moment(d).format('YYYY-MM-DD'));
            markWeekend($el, i % 7);
            markActiveMonth($el, d.getMonth() === month);
        });

        function markWeekend ($el, weekday) {
            $el.toggleClass('day-weekend', weekday === 0 || weekday === 6);
        }

        function markActiveMonth ($el, active) {
            $el.toggleClass('day-inactive', !active);
        }
    },

    onYearsClickHandler: function (event) {
        this.trigger('year');
    },

    prevMonth: function () {
        this.model.prevMonth();
    },

    nextMonth: function () {
        this.model.nextMonth();
    }

});
