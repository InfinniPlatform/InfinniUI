function TimePickerControl( parent ) {
    _.superClass( TimePickerControl, this, parent );
}

_.inherit( TimePickerControl, DateTimePickerControl );

_.extend( TimePickerControl.prototype, {

    createControlModel: function() {
        return new TimePickerModel();
    },

    createControlView: function( model ) {
        return new TimePickerView( { model: model } );
    }
} );

