/**
 *
 * @param parent
 * @constructor
 * @argument Element
 */
function Divider( parent ) {
    _.superClass( Divider, this, parent );
}

InfinniUI.Divider = Divider;

_.inherit( Divider, Element );

/**
 *
 * @param parent
 * @returns {DividerControl}
 */
Divider.prototype.createControl = function( parent ) {
    return new DividerControl( parent );
};
