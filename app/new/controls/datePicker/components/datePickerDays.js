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
        calendarDays: '.day-calendar',
        year: '.years-year',
        month: '.years-month'
    },

    events: {
        'click .years': 'onYearsClickHandler',
        'click .btn-month-prev': 'prevMonth',
        'click .btn-month-next': 'nextMonth',
        'click .today-date': 'showToday',
        'click .day-calendar': 'useDay'
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
        var days = dateTimeFormatInfo.abbreviatedDayNames.map(function(day, i) {
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

        function markWeekend ($el, weekday) {
            $el.toggleClass('day-weekend', weekday === 0 || weekday === 6);
        }
    },

    fillCalendar: function () {
        var model = this.model;
        var valueDate = model.get('value');
        var month = model.get('month');
        var year = model.get('year');
        var day = model.get('day');
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
        });

        function markActiveMonth ($el, active) {
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

    },

    onYearsClickHandler: function (event) {
        var date = new Date(this.model.get('year'), this.model.get('month'));
        this.trigger('year', date);
    },

    prevMonth: function () {
        this.model.prevMonth();
    },

    nextMonth: function () {
        this.model.nextMonth();
    },

    showToday: function () {
        this.model.today();
    },

    useDay: function (event) {
        var $el = $(event.target),
            value =$el.attr('data-date'),
            m = moment(value, 'YYYY-MM-DD');


        this.trigger('date', m.toDate());
    }

});
