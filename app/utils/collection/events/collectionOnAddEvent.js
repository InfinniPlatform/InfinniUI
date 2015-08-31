function CollectionOnAddEvent() {
    CollectionEvent.call(this);
    this
        .setParam('action', 'add');
}

CollectionOnAddEvent.prototype = Object.create(CollectionEvent.prototype);
CollectionOnAddEvent.prototype.constructor = CollectionOnAddEvent;


CollectionOnAddEvent.prototype.init = function (items, startingIndex) {
    this
        .setParam('newItems', items)
        .setParam('newStartingIndex', typeof startingIndex === 'undefined' ? -1 : startingIndex);
};

/**
 * @typedef {Object} CollectionOnAddArgument
 * @property {Array} newItems
 * @property {Number} newStartingIndex
 */