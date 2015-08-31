function CollectionOnChangeEvent() {
    CollectionEvent.call(this);
}

CollectionOnChangeEvent.prototype = Object.create(CollectionEvent.prototype);
CollectionOnChangeEvent.prototype.constructor = CollectionOnChangeEvent;

CollectionOnChangeEvent.prototype.init = function (params) {
    for (var i in params) {
        this.setParam(i, params[i]);
    }
};
