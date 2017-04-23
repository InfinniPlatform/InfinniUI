function DatePickerControl( parent ) {
    _.superClass( DatePickerControl, this, parent );
}

_.inherit( DatePickerControl, DateTimePickerControl );

_.extend( DatePickerControl.prototype, {

    createControlModel: function() {
        return new DatePickerModel();
    },

    createControlView: function( model ) {
        return new DatePickerView( { model: model } );
    }

} );

InfinniUI.DatePickerControl = DatePickerControl;
