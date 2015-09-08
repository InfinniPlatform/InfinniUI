function ContainerBuilder() {
    _.superClass(ContainerBuilder, this);
}

_.inherit(ContainerBuilder, ElementBuilder);

/**
 * @abstract
 */
_.extend(ContainerBuilder.prototype, {

    applyMetadata: function (params) {
        var metadata = params.metadata;
        var element = params.element;

        ElementBuilder.prototype.applyMetadata.call(this, params);

    },

    buildItemProperty: function(itemPropertyMetadata, itemsDataSourceName, params){
        var templateMetadata = {
            Label: {
                Value: {
                    PropertyBinding:{
                        Source: itemsDataSourceName,
                        Property: itemPropertyMetadata
                    }
                }
            }
        };

        return this.buildItemTemplate(templateMetadata, params);
    },

    buildItemFormat: function(itemPropertyMetadata, itemsDataSourceName, itemFormatMetadata, params){
        var templateMetadata = {
            Label: {
                Value: {
                    PropertyBinding:{
                        Source: itemsDataSourceName,
                        Property: itemPropertyMetadata
                    }
                },

                DisplayFormat: itemFormatMetadata
            }
        };

        return this.buildItemTemplate(templateMetadata, params);
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

