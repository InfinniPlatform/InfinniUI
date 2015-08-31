function ContainerBuilder() {
    _.superClass(ContainerBuilder, this);
}

_.inherit(ContainerBuilder, ElementBuilder);

/**
 * @abstract
 */
ContainerBuilder.prototype.getItemTemplateBuilder = function () {
    throw new Error('Не перекрыт метод getItemTemplateBuilder')
};

ContainerBuilder.prototype.applyMetadata = function (params) {
    var metadata = params.metadata;
    var element = params.element;

    ElementBuilder.prototype.applyMetadata.call(this, params);
    element.setItemTemplate(this.getItemTemplateBuilder().getItemTemplate(params));
};



/*ContainerBuilder.prototype.buildItemTemplate = function (params, templateMetadata) {
    var element = params.element;
    var builder = params.builder;

    return function(context, argument) {
        var index = argument.index;
        var item = argument.item;


    };
};*/

