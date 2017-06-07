/**
 * @augments ListEditorBaseControl
 * @constructor
 */
function TreeViewControl() {
    _.superClass( TreeViewControl, this );
}

_.inherit( TreeViewControl, ListEditorBaseControl );

_.extend( TreeViewControl.prototype, {

    /**
     * @returns {TreeViewModel}
     */
    createControlModel: function() {
        return new TreeViewModel();
    },

    /**
     * @returns {TreeViewView}
     * @param model
     */
    createControlView: function( model ) {
        return new TreeViewView( { model: model } );
    },

    /**
     *
     * @param key
     */
    expand: function( key ) {
        this.controlView.expandNode( key );
    },

    /**
     *
     * @param key
     */
    collapse: function( key ) {
        this.controlView.collapseNode( key );
    },

    /**
     *
     * @param key
     */
    toggle: function( key ) {
        this.controlView.toggleNode( key );
    }

} );

InfinniUI.TreeViewControl = TreeViewControl;
