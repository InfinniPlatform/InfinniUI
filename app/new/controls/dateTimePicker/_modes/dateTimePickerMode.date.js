var dateTimePickerModeDate = {
    getTemplate: function () {
        return InfinniUI.Template["new/controls/dateTimePicker/template/date.tpl.html"];
    },

    onClickDropdownHandler: function (event) {
        var model = this.model;
        var calendar = new SelectDate({
            model: model
        });
        calendar.render();
        $('body').append(calendar.$el);

        calendar.updatePosition(this.el);

        this.listenTo(calendar, 'date', function (date) {
            model.set('value', this.convertValue(date));
        });
    },

    convertValue: function (value) {
        return InfinniUI.DateUtils.toISO8601(value, {timezoneOffset: this.model.get('timeZone')});
    }
};