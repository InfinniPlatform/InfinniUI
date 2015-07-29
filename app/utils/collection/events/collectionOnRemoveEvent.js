function CollectionOnRemoveEvent() {
    CollectionEvent.call(this, params);

    this
        .setParam('action', 'remove');
}

CollectionOnRemoveEvent.prototype = Object.create(CollectionEvent.prototype);
CollectionOnRemoveEvent.prototype.constructor = CollectionOnRemoveEvent;

CollectionOnRemoveEvent.prototype.init = function (items, startingIndex) {
    this
        .setParam('oldItems', items)
        .setParam('oldStartingIndex', startingIndex);
};
