var dateTimePickerModeTime = {
    getTemplate: function () {
        return InfinniUI.Template["controls/dateTimePicker/template/time.tpl.html"];
    },

    onClickDropdownHandler: function (event) {
        var model = this.model;
        var calendar = new SelectTime({
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
