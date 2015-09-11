var DateTimePickerDropdown = DatePickerDropdown.extend({

    className: 'pl-datepicker-dropdown',

    template: InfinniUI.Template["new/controls/datePicker/template/dateTimePicker.dropdown.tpl.html"],

    UI: {
        days: '.days',
        months: '.months',
        years: '.years',
        times: '.times',
        hours: '.hours',
        minutes: '.minutes',
        toggleDate: '.toggle-date',
        toggleTime: '.toggle-time',
        panelDate: '.datepicker-date',
        panelTime: '.datepicker-time'
    },

    events: _.extend({}, DatePickerDropdown.prototype.events, {
        'click .toggle-date': "onClickToggleDateHandler",
        'click .toggle-time': "onClickToggleTimeHandler"
    }),

    onClickToggleDateHandler: function () {
        this.toggleDateTimePanel('date');
    },

    onClickToggleTimeHandler: function () {
        this.toggleDateTimePanel('time');
    },

    toggleDateTimePanel: function (name) {
        if (name === 'time') {
            this.ui.panelDate.hide();
            this.ui.panelTime.show();
        } else{
            this.ui.panelTime.hide();
            this.ui.panelDate.show();
        }
    },

    renderComponents: function () {
        var model = this.model;
        var value = model.get('value');
        var m = moment(value);

        if (m.isValid()) {
            value = m.toDate();
        } else {
            value = null;
        }

        var options = {
            value: value,
            //date: value,
            max: model.get('maxValue'),
            min: model.get('minValue')
        };

        options.el = this.ui.months;
        var months = new DatePickerMonths(options);

        options.el = this.ui.years;
        var years = new DatePickerYears(options);

        options.el = this.ui.days;
        var days = new DatePickerDays(options);

        options.el = this.ui.times;
        var time = new DatePickerTime(options);
        //time.setDate(undefined);

        options.el = this.ui.hours;
        var hours = new DatePickerHours(options);

        options.el = this.ui.minutes;
        var minutes = new DatePickerMinutes(options);


        this.workflow(days, months, years, time, hours, minutes)(value);
    },

    workflow: function (days, months, years, time, hours, minutes) {

        this
            .listenTo(days, 'date', this.useValue)
            .listenTo(days, 'year', function (date) {
                showYears(date);//Needed select year from list
            })
            .listenTo(years, 'year', function (date) {
                showMonths(date);//Needed select month for year
            })
            .listenTo(months, 'year', function (date) {
                showYears(date);//Needed select year from list
            })
            .listenTo(months, 'month', function (date) {
                showDays(date);//Needed select day from calendar
            });

        this.listenTo(time, 'hour', function (date) {
                showHours(date);
            })
            .listenTo(time, 'minute', function (date) {
                showMinutes(date);
            })
            .listenTo(hours, 'hour', function (date) {
                showTime(date);
            })
            .listenTo(minutes, 'minute', function (date) {
                showTime(date);
            });

        return showDays;

        function showDays(date) {
            days.setDate(date);

            years.hide();
            months.hide();
            days.show();
        }

        function showMonths(date) {
            months.setDate(date);

            days.hide();
            years.hide();
            months.show();
        }

        function showYears(date) {
            years.setDate(date);

            days.hide();
            months.hide();
            years.show();
        }

        function showHours(date) {
            hours.setDate(date);

            time.hide();
            minutes.hide();
            hours.show();
        }

        function showMinutes(date) {
            minutes.setDate(date);

            time.hide();
            hours.hide();
            minutes.show();
        }

        function showTime(date) {
            time.setDate(date);

            hours.hide();
            minutes.hide();
            time.show();
        }


    }

});