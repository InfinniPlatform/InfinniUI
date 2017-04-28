/**
 *
 * @param parent
 * @constructor
 */
function DatePickerControl( parent ) {
    _.superClass( DatePickerControl, this, parent );
}

_.inherit( DatePickerControl, DateTimePickerControl );

_.extend( DatePickerControl.prototype, {

    /**
     *
     * @returns {DatePickerModel}
     */
    createControlModel: function() {
        return new DatePickerModel();
    },

    /**
     *
     * @param model
     * @returns {DatePickerView}
     */
    createControlView: function( model ) {
        return new DatePickerView( { model: model } );
    }

} );

InfinniUI.DatePickerControl = DatePickerControl;
