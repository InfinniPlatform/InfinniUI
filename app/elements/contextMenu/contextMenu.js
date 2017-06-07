/**
 * @class
 * @constructor
 * @arguments Container
 */
function ContextMenu( parent ) {
    _.superClass( ContextMenu, this, parent );
}

InfinniUI.ContextMenu = ContextMenu;

_.inherit( ContextMenu, Container );

_.extend( ContextMenu.prototype, {

    /**
     *
     * @returns {ContextMenuControl}
     */
    createControl: function() {
        return new ContextMenuControl();
    }

} );
