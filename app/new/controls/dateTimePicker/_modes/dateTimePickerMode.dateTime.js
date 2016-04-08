var dateTimePickerModeDateTime = {
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

        this.updateDropDownCalendarPosition(this.$el, calendar.$el);

        this.listenTo(calendar, 'date', function (date) {
            model.set('value', this.convertValue(date));
        });
    },

    convertValue: function (value) {
        return InfinniUI.DateUtils.toISO8601(value, {timezoneOffset: this.model.get('timeZone')});
    }
};