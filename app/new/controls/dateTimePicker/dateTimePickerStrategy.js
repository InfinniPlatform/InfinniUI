var dateTimePickerStrategy = (function () {

    function updateDropDownCalendarPosition($dateTimePicker, $calendar) {

        var rect = $dateTimePicker[0].getBoundingClientRect();

        var style = {
            position: "absolute",
            top: window.pageYOffset + rect.bottom,
            left: window.pageXOffset + rect.right - $calendar.width()
        };

        $calendar.css(style);
    }

    return {
        DatePicker: {

            getTemplate: function () {
                return InfinniUI.Template["new/controls/dateTimePicker/template/date.tpl.html"];
            },

            onClickDropdownHandler: function (event) {
                var calendar = new SelectDate({
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
                return InfinniUI.Template["new/controls/dateTimePicker/template/date.tpl.html"];
            },

            onClickDropdownHandler: function (event) {
                var calendar = new SelectDate({
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
                return InfinniUI.DateUtils.toISO8601(value, {timezoneOffset: this.model.get('timeZone')});
            }
        },

        DateTime: {
            getTemplate: function () {
                return InfinniUI.Template["new/controls/dateTimePicker/template/dateTime.tpl.html"];
            },

            onClickDropdownHandler: function (event) {
                var model = this.model;
                var calendar = new SelectDateTime({
                    model: model
                });
                calendar.render();
                $('body').append(calendar.$el);

                updateDropDownCalendarPosition(this.$el, calendar.$el);

                this.listenTo(calendar, 'date', function (date) {
                    model.set('value', InfinniUI.DateUtils.toISO8601(date, {timezoneOffset: model.get('timeZone')}));
                });
            },

            convertValue: function (value) {
                return InfinniUI.DateUtils.toISO8601(value, {timezoneOffset: this.model.get('timeZone')});
            }

        },

        Time: {
            getTemplate: function () {
                return InfinniUI.Template["new/controls/dateTimePicker/template/time.tpl.html"];
            },

            onClickDropdownHandler: function (event) {
                var model = this.model;
                var calendar = new SelectTime({
                    model: model
                });
                calendar.render();
                $('body').append(calendar.$el);

                updateDropDownCalendarPosition(this.$el, calendar.$el);
                
                this.listenTo(calendar, 'date', function (date) {
                    model.set('value', InfinniUI.DateUtils.toISO8601(date, {timezoneOffset: model.get('timeZone')}));
                });
            },

            convertValue: function (value) {
                return InfinniUI.DateUtils.toISO8601(value, {timezoneOffset: model.get('timeZone')});
            }

        }

    };

})();

