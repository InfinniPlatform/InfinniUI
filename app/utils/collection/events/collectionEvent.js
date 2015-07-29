function CollectionEvent() {
    this.params = Object.create(null);
}

CollectionEvent.prototype.init = function () {

};

CollectionEvent.prototype.setParam = function (name, value) {
    this.params[name] = value;
    return this;
};

CollectionEvent.prototype.getArgument = function () {
    return this.params;
};
