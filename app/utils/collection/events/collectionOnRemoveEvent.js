function CollectionOnRemoveEvent() {
    CollectionEvent.call(this);

    this
        .setParam('action', 'remove');
}

CollectionOnRemoveEvent.prototype = Object.create(CollectionEvent.prototype);
CollectionOnRemoveEvent.prototype.constructor = CollectionOnRemoveEvent;

CollectionOnRemoveEvent.prototype.init = function (items, startingIndex) {
    this
        .setParam('oldItems', items)
        .setParam('oldStartingIndex', typeof startingIndex === 'undefined' ? -1 : startingIndex);
};
