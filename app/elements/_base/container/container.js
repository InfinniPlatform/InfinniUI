/**
 * @param parent
 * @param viewMode
 * @constructor
 * @augments Element
 */
function Container( parent, viewMode ) {
    _.superClass( Container, this, parent, viewMode );
}

InfinniUI.Container = Container;

_.inherit( Container, Element );

/**
 * @returns {*}
 */
Container.prototype.getItemTemplate = function() {
    return this.control.get( 'itemTemplate' );
};

/**
 *
 * @param itemTemplate
 */
Container.prototype.setItemTemplate = function( itemTemplate ) {
    if ( typeof itemTemplate !== 'function' ) {
        throw new Error( 'Function expected' );
    }
    this.control.set( 'itemTemplate', itemTemplate );
};

/**
 * @returns {*}
 */
Container.prototype.getItems = function() {
    return this.control.get( 'items' );
};

/**
 * @returns {*}
 */
Container.prototype.getGroupValueSelector = function() {
    return this.control.get( 'groupValueSelector' );
};

/**
 *
 * @param value
 */
Container.prototype.setGroupValueSelector = function( value ) {
    this.control.set( 'groupValueSelector', value );
};

/**
 * @returns {*}
 */
Container.prototype.getGroupItemTemplate = function() {
    return this.control.get( 'groupItemTemplate' );
};

/**
 *
 * @param value
 */
Container.prototype.setGroupItemTemplate = function( value ) {
    this.control.set( 'groupItemTemplate', value );
};

/**
 * @returns {*}
 */
Container.prototype.getGroupItemComparator = function() {
    return this.control.get( 'groupItemComparator' );
};

/**
 *
 * @param value
 */
Container.prototype.setGroupItemComparator = function( value ) {
    this.control.set( 'groupItemComparator', value );
};
