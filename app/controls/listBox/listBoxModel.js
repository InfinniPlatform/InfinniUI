/**
 * @constructor
 * @augments ListEditorBaseModel
 */
var ListBoxModel = ListEditorBaseModel.extend( {

    /**
     *
     */
    initialize: function() {
        ListEditorBaseModel.prototype.initialize.apply( this, Array.prototype.slice.call( arguments ) );
    }

} );

InfinniUI.ListBoxModel = ListBoxModel;
