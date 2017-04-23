/**
 *
 * @param parent
 * @constructor
 * @augments TextEditorBaseControl
 */
function DateTimePickerControl( parent ) {
    _.superClass( DateTimePickerControl, this, parent );
}

window.InfinniUI.DateTimePickerControl = DateTimePickerControl;

_.inherit( DateTimePickerControl, TextEditorBaseControl );

_.extend( DateTimePickerControl.prototype, {

    createControlModel: function() {
        return new DateTimePickerModel();
    },

    createControlView: function( model ) {
        return new DateTimePickerView( { model: model } );
    }

} );

InfinniUI.DateTimePickerControl = DateTimePickerControl;
