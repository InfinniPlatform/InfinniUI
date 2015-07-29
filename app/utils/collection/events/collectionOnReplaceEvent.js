function CollectionOnReplaceEvent() {
    CollectionEvent.call(this);
    this
        .setParam('action', 'add');
}

CollectionOnReplaceEvent.prototype = Object.create(CollectionEvent.prototype);
CollectionOnReplaceEvent.prototype.constructor = CollectionOnReplaceEvent;

CollectionOnReplaceEvent.prototype.init = function (oldItems, newItems) {
    this
        .setParam('oldItems', oldItems)
        .setParam('newItems', newItems);
};
