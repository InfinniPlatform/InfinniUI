function ContainerBuilder() {
    _.superClass(ContainerBuilder, this);
}

_.inherit(ContainerBuilder, ElementBuilder);

/**
 * @abstract
 */
_.extend(ContainerBuilder.prototype, {
    getItemTemplateBuilder: function () {
        throw new Error('Не перекрыт метод getItemTemplateBuilder')
    },

    applyMetadata: function (params) {
        var metadata = params.metadata;
        var element = params.element;

        ElementBuilder.prototype.applyMetadata.call(this, params);

    },

    buildItemTemplate: function (templateMetadata, params) {
        var element = params.element;
        var builder = params.builder;
        var basePathOfProperty = params.basePathOfProperty || new BasePathOfProperty('');

        return function(context, args) {
            var index = args.index;
            var item = args.item;
            var argumentForBuilder = _.extend({}, params.args);

            if(index !== undefined && index !== null){
                argumentForBuilder.basePathOfProperty = basePathOfProperty.buildChild('', index);
            }

            return builder.build(context, argumentForBuilder);
        };
    }
});

