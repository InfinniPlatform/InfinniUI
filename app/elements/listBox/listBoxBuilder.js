/**
 * @augments ListEditorBaseBuilder
 * @constructor
 */
function ListBoxBuilder() {
    _.superClass( ListBoxBuilder, this );
}

InfinniUI.ListBoxBuilder = ListBoxBuilder;

_.inherit( ListBoxBuilder, ListEditorBaseBuilder );

_.extend( ListBoxBuilder.prototype, {

    /**
     *
     * @param params
     * @returns {ListBox}
     */
    createElement: function( params ) {
        return new ListBox( params.parent, params.metadata[ 'ViewMode' ] );
    },

    /**
     *
     * @param params
     */
    applyMetadata: function( params ) {
        ListEditorBaseBuilder.prototype.applyMetadata.call( this, params );
    }

} );
