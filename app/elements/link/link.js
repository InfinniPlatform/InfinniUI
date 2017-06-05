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

/**
 *
 * @returns {LinkElementControl}
 */
Link.prototype.createControl = function() {
    return new LinkElementControl();
};

/**
 *
 * @param value
 */
Link.prototype.setHref = function( value ) {
    this.control.set( 'href', value );
};

/**
 * @returns {*}
 */
Link.prototype.getHref = function() {
    return this.control.get( 'href' );
};

/**
 *
 * @param value
 */
Link.prototype.setTarget = function( value ) {
    this.control.set( 'target', value );
};

/**
 * @returns {*}
 */
Link.prototype.getTarget = function() {
    return this.control.get( 'target' );
};
