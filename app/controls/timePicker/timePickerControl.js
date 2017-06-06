/**
 * @augments DateTimePickerControl
 * @param parent
 * @constructor
 */
function TimePickerControl( parent ) {
    _.superClass( TimePickerControl, this, parent );
}

_.inherit( TimePickerControl, DateTimePickerControl );

_.extend( TimePickerControl.prototype, {

    /**
     * @returns {TimePickerModel}
     */
    createControlModel: function() {
        return new TimePickerModel();
    },

    /**
     * @returns {TimePickerView}
     * @param model
     */
    createControlView: function( model ) {
        return new TimePickerView( { model: model } );
    }

} );

InfinniUI.TimePickerControl = TimePickerControl;
