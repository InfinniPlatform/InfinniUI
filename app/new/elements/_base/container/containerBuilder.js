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

    buildItemProperty: function(itemsBinding, itemPropertyMetadata, params){

        return function(context, args){
            var index = args.index;
            var label = new Label(this);
            var sourceProperty;
            var source = itemsBinding.getSource();
            var binding = new DataBinding(this);

            sourceProperty = index.toString();
            if(itemsBinding.getSourceProperty() != ''){
                sourceProperty = itemsBinding.getSourceProperty() + '.' + sourceProperty;
            }
            if(itemPropertyMetadata != ''){
                sourceProperty = sourceProperty + '.' + itemPropertyMetadata;
            }

            binding.bindSource(source, sourceProperty);
            binding.bindElement(label, 'value');

            return label;
        };
    },

    buildItemFormat: function(itemsBinding, itemFormatMetadata, params){

        return function(context, args){
            var index = args.index;
            var label = new Label(this);
            var format = new ObjectFormat();

            var sourceProperty = itemsBinding.getSourceProperty();
            var source = itemsBinding.getSource();
            var binding = new DataBinding(this);

            sourceProperty = index.toString();
            if(itemsBinding.getSourceProperty() != ''){
                sourceProperty = itemsBinding.getSourceProperty() + '.' + sourceProperty;
            }

            format.setFormat(itemFormatMetadata);
            label.setDisplayFormat(format);

            binding.bindSource(source, sourceProperty);
            binding.bindElement(label, 'value');

            return label;
        };

    },

    buildItemSelector: function(itemsBinding, itemSelectorMetadata, params){

        return function (context, args) {
            var index = args.index;
            var label = new Label(this);
            var scriptExecutor = new ScriptExecutor(params.parentView);

            var sourceProperty = itemsBinding.getSourceProperty();
            var source = itemsBinding.getSource();
            var binding = new DataBinding(this);

            sourceProperty = index.toString();
            if(itemsBinding.getSourceProperty() != ''){
                sourceProperty = itemsBinding.getSourceProperty() + '.' + sourceProperty;
            }

            binding.setConverter({
                toElement: function(_context, _args){
                    return scriptExecutor.executeScript(itemSelectorMetadata.Name, _args);
                }
            });

            binding.bindSource(source, sourceProperty);
            binding.bindElement(label, 'value');

            return label;
        }
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

