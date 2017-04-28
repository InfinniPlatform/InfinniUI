/**
 *
 * @param parent
 * @constructor
 * @augments TextEditorBaseControl
 */
function DateTimePickerControl( parent ) {
    _.superClass( DateTimePickerControl, this, parent );
}

InfinniUI.DateTimePickerControl = DateTimePickerControl;

_.inherit( DateTimePickerControl, TextEditorBaseControl );

_.extend( DateTimePickerControl.prototype, {

    /**
     *
     * @returns {DateTimePickerModel}
     */
    createControlModel: function() {
        return new DateTimePickerModel();
    },

    /**
     *
     * @param model
     * @returns {DateTimePickerView}
     */
    createControlView: function( model ) {
        return new DateTimePickerView( { model: model } );
    }

} );

InfinniUI.DateTimePickerControl = DateTimePickerControl;
