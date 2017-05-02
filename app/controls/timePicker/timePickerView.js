var TimePickerView = DateTimePickerView .extend( {

    className: 'pl-datepicker pl-timepicker form-group',

    editMaskStrategies: {
        DateTimeEditMask: 'timestamp'
    },

    initialize: function () {
        DateTimePickerView.prototype.initialize.apply( this, Array.prototype.slice.call( arguments ) );
    }

} );

InfinniUI.TimePickerView = TimePickerView;
