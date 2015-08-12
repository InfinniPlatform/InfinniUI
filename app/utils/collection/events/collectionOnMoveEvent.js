function CollectionOnMoveEvent() {
    CollectionEvent.call(this);
    this
        .setParam('action', 'move');
}

CollectionOnMoveEvent.prototype = Object.create(CollectionEvent.prototype);
CollectionOnMoveEvent.prototype.constructor = CollectionOnMoveEvent;

CollectionOnMoveEvent.prototype.init = function (items, oldStartingIndex, newStartingIndex) {
    this
        .setParam('oldItems', items)
        .setParam('newItems', items)
        .setParam('oldStartingIndex', oldStartingIndex)
        .setParam('newStartingIndex', newStartingIndex);
};

/**
 * @typedef {Object} CollectionOnMoveArgument
 * @property {Array} oldItems
 * @property {Array} newItems
 * @property {Number} oldStartingIndex
 * @property {Number} newStartingIndex
 */