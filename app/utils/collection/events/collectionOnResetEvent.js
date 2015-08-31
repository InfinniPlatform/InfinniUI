function CollectionOnResetEvent() {
    CollectionEvent.call(this);
    this
        .setParam('action', 'reset');
}

CollectionOnResetEvent.prototype = Object.create(CollectionEvent.prototype);
CollectionOnResetEvent.prototype.constructor = CollectionOnResetEvent;

/**
 * @typedef {Object} CollectionOnResetArgument
 */