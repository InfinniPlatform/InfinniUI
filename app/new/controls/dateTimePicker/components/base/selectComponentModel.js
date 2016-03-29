var SelectComponentModel = Backbone.Model.extend({

    initialize: function () {
        this.on('change:date', this.onChangeDateHandler, this);
    },

    onChangeDateHandler: function (model, value) {
        if (typeof value !== 'undefined' && value !== null) {
            model.set({
                year: moment(value).year(),
                month: moment(value).month(),
                day: moment(value).date(),
                hour: moment(value).hour(),
                minute: moment(value).minute(),
                second: moment(value).second(),
                millisecond: moment(value).millisecond()
            })
        } else {
            model.set({
                year: null,
                month: null,
                day: null,
                hour: null,
                minute: null,
                second: null,
                millisecond: null
            });
        }
    },

    updateDatePart: function (datePart, model, value) {
        var
            d = this.get('date'),
            date = new Date(d),
            data = this.toJSON();

        switch (datePart) {
            case 'hour':
            case 'minute':
            case 'second':
                date.setHours(data.hour, data.minute, data.second);
                break;
            case 'year':
            case 'month':
            case 'day':
                date.setFullYear(data.year, data.month, data.day);
                break;
        }
        this.set('date', date);
    },

    checkRange: function (value) {
        return true;
    }


});

