var DatePickerDays = Backbone.View.extend({

    template: InfinniUI.Template["new/controls/datePicker/template/date/days.tpl.html"],

    UI: {
        headerDays: '.weekdays-head .day',
        calendarDays: '.weekdays-calendar .day'
    },

    events: {
        'click .years': 'onYearsClickHandler'
    },

    render: function () {
        var template = this.template();
        this.$el.html(template);
        this.bindUIElements();
        this.fillLegend();
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
        var firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        var weekday = firstDayOfMonth.getDay();
        var month = firstDayOfMonth.getMonth();
        var startDate = new Date(firstDayOfMonth.getFullYear(), month, 1 - weekday);

        this.ui.calendarDays.each(function (i, el) {
            var $el = $(el);
            var d = new Date(startDate.getFullYear(), month, startDate.getDay() + i);
            $el.text(d.getDate());
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
        this.trigger('years');
    }

});

_.extend(DatePickerDays.prototype, bindUIElementsMixin);
