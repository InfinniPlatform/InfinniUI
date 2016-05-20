var SelectTime = SelectDate.extend({

    className: 'pl-timepicker-dropdown pl-dropdown-container',

    template: InfinniUI.Template["controls/dateTimePicker/template/select.time.tpl.html"],

    UI: {
        times: '.times',
        hours: '.hours',
        minutes: '.minutes',
        seconds: '.seconds'
    },

    renderComponents: function () {
        var model = this.model;
        var value = InfinniUI.DateUtils.createDate(model.get('value'));
        var today = InfinniUI.DateUtils.createDate(model.get('today'));
        var timeZone = model.get('timeZone');
        var m = moment(value);

        if (m.isValid()) {
            value = m.toDate();
        } else {
            value = null;
        }

        value = InfinniUI.DateUtils.changeTimezoneOffset(value, timeZone);
        //if (value === null || typeof value === 'undefined') {
        //    value = today;
        //}

        var options = {
            value: value,
            today: today,
            //date: date,
            max: model.get('maxValue'),
            min: model.get('minValue')
        };

        options.el = this.ui.times;
        var time = new SelectTimes(options);

        options.el = this.ui.hours;
        var hours = new SelectHours(options);

        options.el = this.ui.minutes;
        var minutes = new SelectMinutes(options);

        options.el = this.ui.seconds;
        var seconds = new SelectSeconds(options);

        this.workflow(time, hours, minutes, seconds)(value);
    },

    useTime: function (date) {
        var model = this.model;
        var timeZone = model.get('timeZone');

        var min = model.get('minValue'),
            max = model.get('maxValue');

        if (!InfinniUI.DateUtils.checkRangeDate(date, min, max)) {
            date = InfinniUI.DateUtils.getNearestDate(date, min, max);
        }

        this.trigger('date', InfinniUI.DateUtils.restoreTimezoneOffset(date, timeZone));
        return date;
    },

    workflow: function (time, hours, minutes, seconds) {
        var useTime = this.useTime.bind(this);
        var components = Array.prototype.slice.call(arguments);

        this.listenTo(time, 'hour', function (date) {
            showHours(date);
        })
            .listenTo(time, 'minute', function (date) {
                showMinutes(date);
            })
            .listenTo(time, 'second', function (date) {
                showSeconds(date);
            })
            .listenTo(time, 'date', function (date) {
                useTime(date);
            })
            .listenTo(hours, 'hour', function (date) {
                var value = useTime(date);
                showTime(value);
            })
            .listenTo(minutes, 'minute', function (date) {
                var value = useTime(date);
                showTime(value);
            })
            .listenTo(seconds, 'second', function (date) {
                var value = useTime(date);
                showTime(value);
            });

        return showTime;

        function switchComponent(component) {
            components.forEach(function (c) {
                if (c !== component) {
                    c.hide();
                }
            });
            component.show();
        }

        function showHours(date) {
            hours.setDate(date);
            switchComponent(hours);
        }

        function showMinutes(date) {
            minutes.setDate(date);
            switchComponent(minutes);
        }

        function showSeconds(date) {
            seconds.setDate(date);
            switchComponent(seconds);
        }

        function showTime(date) {
            time.setDate(date);
            switchComponent(time);
        }

    }

});