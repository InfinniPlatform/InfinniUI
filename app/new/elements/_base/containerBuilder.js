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
            var argumentForBuilder = {
                parentView: params.parentView
            };

            if(index !== undefined && index !== null){
                argumentForBuilder.basePathOfProperty = basePathOfProperty.buildChild('', index);
            }

            return builder.build(templateMetadata, argumentForBuilder);
        };
    },

    /**
     * @public
     * @memberOf ContainerBuilder
     * @description Возвращает функцию itemTemplate для не шаблонизируемого item'а.
     * @param {Object} itemMetadata метаданные.
     * @param {Object} params стандартные params, передаваемые внутри билдеров.
     **/
    buildItemTemplateForUniqueItem: function (itemsMetadata, params) {
        var element = params.element;
        var builder = params.builder;
        var basePathOfProperty = params.basePathOfProperty || new BasePathOfProperty('');

        return function(context, args) {
            var index = args.index;
            var argumentForBuilder = {
                parentView: params.parentView,
                basePathOfProperty: basePathOfProperty
            };

            return builder.build(itemsMetadata[index], argumentForBuilder);
        };
    }
});

