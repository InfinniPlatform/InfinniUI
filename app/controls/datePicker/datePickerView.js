var DatePickerView = DateTimePickerView.extend({
    editMaskStrategies: {
        DateTimeEditMask: 'timestamp'
    },

    initialize: function () {
        DateTimePickerView.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
    }
});