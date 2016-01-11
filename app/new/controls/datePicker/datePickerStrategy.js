var datePickerStrategy = {
    Date: {
        getTemplate: function () {
            return InfinniUI.Template["new/controls/datePicker/template/datePicker.tpl.html"];
        },

        onClickDropdownHandler: function (event) {
            var calendar = new DatePickerDropdown({
                model: this.model
            });

            calendar.render();
            $('body').append(calendar.$el);

            calendar.$el.css({
                top: event.clientY,
                left: event.clientX
            });

            this.listenTo(calendar, 'date', function (date) {
                this.model.set('value', this.convertValue(date));
            });
        },

        convertValue: function (value) {
            return InfinniUI.DateUtils.toISO8601(value, {resetTime: true});
        }
    },

    DateTime: {
        getTemplate: function () {
            return InfinniUI.Template["new/controls/datePicker/template/dateTimePicker.tpl.html"];
        },

        onClickDropdownHandler: function (event) {
            var calendar = new DateTimePickerDropdown({
                model: this.model
            });
            calendar.render();
            $('body').append(calendar.$el);

            calendar.$el.css({
                top: event.clientY,
                left: event.clientX
            });

            this.listenTo(calendar, 'date', function (date) {
                this.model.set('value', InfinniUI.DateUtils.toISO8601(date));
            });
        },

        convertValue: function (value) {
            return InfinniUI.DateUtils.toISO8601(value);
        }

    },

    Time: {
        getTemplate: function () {
            return InfinniUI.Template["new/controls/datePicker/template/timePicker.tpl.html"];
        },

        onClickDropdownHandler: function (event) {
            var calendar = new TimePickerDropdown({
                model: this.model
            });
            calendar.render();
            $('body').append(calendar.$el);

            calendar.$el.css({
                top: event.clientY,
                left: event.clientX
            });

            this.listenTo(calendar, 'date', function (date) {
                this.model.set('value', InfinniUI.DateUtils.toISO8601(date));
            });
        },

        convertValue: function (value) {
            return InfinniUI.DateUtils.toISO8601(value);
        }

    }

};
