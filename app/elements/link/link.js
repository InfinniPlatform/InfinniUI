/**
 * @param parent
 * @augments Button
 * @constructor
 */
function Link( parent ) {
    _.superClass( Link, this, parent );
}

InfinniUI.Link = Link;

_.inherit( Link, Button );

Link.prototype.createControl = function() {
    return new LinkElementControl();
};

Link.prototype.setHref = function( value ) {
    this.control.set( 'href', value );
};

Link.prototype.getHref = function() {
    return this.control.get( 'href' );
};

Link.prototype.setTarget = function( value ) {
    this.control.set( 'target', value );
};

Link.prototype.getTarget = function() {
    return this.control.get( 'target' );
};
