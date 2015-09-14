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
        this.trigger('days');
    },

    onClickToggleTimeHandler: function () {
        this.trigger('time');
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

    useTime: function (date) {
        this.trigger('date', date);
    },

    workflow: function (days, months, years, time, hours, minutes) {
        var
            panelDate = this.ui.panelDate,
            panelTime = this.ui.panelTime;
        var useTime = this.useTime.bind(this);
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
            .listenTo(time, 'date', function (date) {
                useTime(date);
            })
            .listenTo(hours, 'hour', function (date) {
                useTime(date);
                showTime(date);
            })
            .listenTo(minutes, 'minute', function (date) {
                useTime(date);
                showTime(date);
            });

        //Переключатель режима Date/Time
        this
            .on('days', function (date) {
                showDays(date);
            })
            .on('time', function (date) {
                showTime(date);
            });

        return showDays;

        function showDays(date) {
            days.setDate(date);

            toggleDateTimePanel('date');
            years.hide();
            months.hide();
            days.show();
        }

        function showMonths(date) {
            months.setDate(date);

            toggleDateTimePanel('date');
            days.hide();
            years.hide();
            months.show();
        }

        function showYears(date) {
            years.setDate(date);

            toggleDateTimePanel('date');
            days.hide();
            months.hide();
            years.show();
        }

        function showHours(date) {
            hours.setDate(date);

            toggleDateTimePanel('time');
            time.hide();
            minutes.hide();
            hours.show();
        }

        function showMinutes(date) {
            minutes.setDate(date);

            toggleDateTimePanel('time');
            time.hide();
            hours.hide();
            minutes.show();
        }

        function showTime(date) {
            time.setDate(date);

            toggleDateTimePanel('time');
            hours.hide();
            minutes.hide();
            time.show();
        }

        function toggleDateTimePanel(name) {
            if (name === 'time') {
                panelDate.hide();
                panelTime.show();
            } else{
                panelTime.hide();
                panelDate.show();
            }
        }



    }

});