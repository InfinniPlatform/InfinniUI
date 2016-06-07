var TimePickerModel = DateTimePickerModel.extend({

    initialize: function () {
        DateTimePickerModel.prototype.initialize.apply(this, arguments);
        var date = new Date();
        date.setFullYear(1970, 0, 1);
        this.set('today', date);
    }

});