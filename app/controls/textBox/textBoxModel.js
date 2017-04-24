/**
 * @class
 * @augments TextEditorBaseModel
 */
var TextBoxModel = TextEditorBaseModel.extend( {

    defaults: _.extend(
        {},
        TextEditorBaseModel.prototype.defaults,
        {
            multiline: false,
            inputType: 'text'
        }
    ),

    initialize: function() {
        TextEditorBaseModel.prototype.initialize.apply( this, Array.prototype.slice.call( arguments ) );
    }

} );

InfinniUI.TextBoxModel = TextBoxModel;
