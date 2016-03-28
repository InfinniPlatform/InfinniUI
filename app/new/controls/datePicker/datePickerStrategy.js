var datePickerStrategy = (function () {

    function updateDropDownCalendarPosition($datePicker, $calendar) {

        var rect = $datePicker[0].getBoundingClientRect();

        var style = {
            position: "absolute",
            top: window.pageYOffset + rect.bottom,
            left: window.pageXOffset + rect.right - $calendar.width()
        };

        $calendar.css(style);
    }

    return {
        Date2: {

            getTemplate: function () {
                return InfinniUI.Template["new/controls/datePicker/template/datePicker.tpl.html"];
            },

            onClickDropdownHandler: function (event) {
                var calendar = new DatePickerDropdown({
                    model: this.model
                });

                calendar.render();
                $('body').append(calendar.$el);

                updateDropDownCalendarPosition(this.$el, calendar.$el);

                this.listenTo(calendar, 'date', function (date) {
                    this.model.set('value', this.convertValue(date));
                });
            },

            onEditorDone: function (value) {
                if(typeof value === 'undefined' || value === null || !value.toString().length) {
                    value = null;
                } else {
                    //Дата в формате IS) 8601
                    value = InfinniUI.DateUtils.dateToTimestamp(value);
                }

                this.model.set('value', value);
            },

            convertValue: function (value) {
                var _value;
                if (value && value.constructor === Date) {
                    _value = InfinniUI.DateUtils.dateToTimestamp(value);
                }

                return _value;
            }

        },
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

                updateDropDownCalendarPosition(this.$el, calendar.$el);

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

                updateDropDownCalendarPosition(this.$el, calendar.$el);

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

                updateDropDownCalendarPosition(this.$el, calendar.$el);
                
                this.listenTo(calendar, 'date', function (date) {
                    this.model.set('value', InfinniUI.DateUtils.toISO8601(date));
                });
            },

            convertValue: function (value) {
                return InfinniUI.DateUtils.toISO8601(value);
            }

        }

    };

})();

