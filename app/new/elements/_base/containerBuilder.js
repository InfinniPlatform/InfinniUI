function ContainerBuilder() {
    _.superClass(ContainerBuilder, this);
}

_.inherit(ContainerBuilder, ElementBuilder);

ContainerBuilder.prototype.applyMetadata = function (params) {
    var metadata = params.metadata;
    ElementBuilder.prototype.applyMetadata.call(this, params);
    //this.initItemTemplate(params);
};

