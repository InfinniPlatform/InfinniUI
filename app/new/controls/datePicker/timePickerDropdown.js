var TimePickerDropdown = DatePickerDropdown.extend({

    className: 'pl-timepicker-dropdown',

    template: InfinniUI.Template["new/controls/datePicker/template/timePicker.dropdown.tpl.html"],

    UI: {
        times: '.times',
        hours: '.hours',
        minutes: '.minutes'
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

        options.el = this.ui.times;
        var time = new DatePickerTime(options);

        options.el = this.ui.hours;
        var hours = new DatePickerHours(options);

        options.el = this.ui.minutes;
        var minutes = new DatePickerMinutes(options);


        this.workflow(time, hours, minutes)(value);
    },

    useTime: function (date) {
        this.trigger('date', date);
    },

    workflow: function (time, hours, minutes) {
        var useTime = this.useTime.bind(this);
        var components = Array.prototype.slice.call(arguments);

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

        function showTime(date) {
            time.setDate(date);
            switchComponent(time);
        }

    }

});