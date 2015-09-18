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
                this.model.set('value', InfinniUI.DateUtils.toISO8601(date));
            });
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
        }
    }

};
