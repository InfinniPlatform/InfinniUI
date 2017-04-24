/**
 *
 * @constructor
 */
function CollectionEventManager() {
}

InfinniUI.CollectionEventManager = CollectionEventManager;

_.extend( CollectionEventManager.prototype, Backbone.Events );


/**
 *
 * @param {Array} newItems
 * @param {number} [newStartingIndex]
 * @returns {CollectionEventManager}
 */
CollectionEventManager.prototype.onAdd = function( newItems, newStartingIndex ) {
    var params = {
        action: 'add',
        newItems: newItems,
        newStartingIndex: typeof newStartingIndex !== 'undefined' ? newStartingIndex : -1
    };

    this.trigger( 'add', params );
    this.trigger( 'change', params );

    return this;
};

/**
 *
 * @returns {CollectionEventManager}
 */
CollectionEventManager.prototype.onReset = function() {
    var params = {
        action: 'reset'
    };

    this.trigger( 'reset', params );
    this.trigger( 'change', params );
    return this;
};

/**
 *
 * @param {Array} oldItems
 * @param {Array} newItems
 * @returns {CollectionEventManager}
 */
CollectionEventManager.prototype.onReplace = function( oldItems, newItems ) {
    var params = {
        action: 'replace',
        oldItems: oldItems,
        newItems: newItems
    };

    this.trigger( 'replace', params );
    this.trigger( 'change', params );
    return this;
};

/**
 *
 * @param {Array} oldItems
 * @param {number} [oldStartingIndex]
 * @returns {CollectionEventManager}
 */
CollectionEventManager.prototype.onRemove = function( oldItems, oldStartingIndex ) {
    var params = {
        action: 'remove',
        oldItems: oldItems,
        oldStartingIndex: typeof oldStartingIndex !== 'undefined' ? oldStartingIndex : -1
    };

    this.trigger( 'remove', params );
    this.trigger( 'change', params );
    return this;
};

/**
 *
 * @param {Array} oldItems
 * @param {Array} newItems
 * @param {number} oldStartingIndex
 * @param {number} newStartingIndex
 * @returns {CollectionEventManager}
 */
CollectionEventManager.prototype.onMove = function( oldItems, newItems, oldStartingIndex, newStartingIndex ) {
    var params = {
        oldItems: oldItems,
        newItems: newItems,
        oldStartingIndex: oldStartingIndex,
        newStartingIndex: newStartingIndex
    };

    this.trigger( 'move', params );
    this.trigger( 'change', params );
    return this;
};
