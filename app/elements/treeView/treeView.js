/**
 * @param parent
 * @constructor
 * @augments ListEditorBase
 */
function TreeView( parent ) {
    _.superClass( TreeView, this, parent );
}

InfinniUI.TreeView = TreeView;

_.inherit( TreeView, ListEditorBase );

/**
 *
 * @returns {TreeViewControl}
 */
TreeView.prototype.createControl = function() {
    return new TreeViewControl();
};

/**
 *
 * @returns Function}
 */
TreeView.prototype.getKeySelector = function() {
    return this.control.get( 'keySelector' );
};

/**
 *
 * @param {Function} value
 */
TreeView.prototype.setKeySelector = function( value ) {
    this.control.set( 'keySelector', value );
};

/**
 *
 * @returns {Function}
 */
TreeView.prototype.getParentSelector = function() {
    return this.control.get( 'parentSelector' );
};

/**
 *
 * @param {Function} value
 */
TreeView.prototype.setParentSelector = function( value ) {
    this.control.set( 'parentSelector', value );
};

/**
 *
 * @param key
 */
TreeView.prototype.expand = function( key ) {
    this.control.expand( key );
};

/**
 *
 * @param key
 */
TreeView.prototype.collapse = function( key ) {
    this.control.collapse( key );
};

/**
 *
 * @param key
 */
TreeView.prototype.toggle = function( key ) {
    this.control.toggle( key );
};

/**
 *
 * @returns {Function}
 */
TreeView.prototype.getOnExpand = function() {
    return this.control.get( 'onExpand' );
};

/**
 *
 * @param {Function} callback
 */
TreeView.prototype.setOnExpand = function( callback ) {
    this.control.set( 'onExpand', callback );
};

/**
 *
 * @returns {Function}
 */
TreeView.prototype.getOnCollapse = function() {
    return this.control.get( 'onCollapse' );
};

/**
 *
 * @param {Function} callback
 */
TreeView.prototype.setOnCollapse = function( callback ) {
    this.control.set( 'onCollapse', callback );
};
