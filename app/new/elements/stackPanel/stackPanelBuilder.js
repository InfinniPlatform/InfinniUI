/**
 * @constructor
 * @augments ContainerBuilder
 */
function StackPanelBuilder() {
    _.superClass(StackPanelBuilder, this);
}

_.inherit(StackPanelBuilder, ContainerBuilder);

_.extend(StackPanelBuilder.prototype,
    /** @lends StackPanelBuilder.prototype*/
    {
        createElement: function (params) {
            return new StackPanel(params.parent);
        },

        /**
         * @param {Object} params
         * @param {StackPanel} params.element
         * @param {Object} params.metadata
         */
        applyMetadata: function (params) {
            var
                metadata = params.metadata,
                element = params.element;

            ContainerBuilder.prototype.applyMetadata.call(this, params);
            element.setOrientation(metadata.Orientation);

            this.initItems(params);
        },

        initItems: function(params){
            var metadata = params.metadata;

            if($.isArray(metadata.Items)){  // отдельные не шаблонизируемые items, в metadata.Items - список методанных item'ов
                this.initNotTemplatingItems(params);
            }else{                          // шаблонизируемые однотипные items, в metadata.Items - биндинг на данные item'ов
                this.initTemplatingItems(params);
            }
        },

        initTemplatingItems: function(params){
            var metadata = params.metadata;
            var element = params.element;
            var itemTemplate;
            var binding;
            var property;

            binding = params.builder.build(metadata.Items, {
                parentView: params.parentView,
                basePathOfProperty: params.basePathOfProperty
            });

            binding.bindElement(element, 'items');

            if(metadata.ItemTemplate){
                itemTemplate = this.buildItemTemplate(metadata.ItemTemplate, params);
            }else if(metadata.ItemFormat){
                itemTemplate = this.buildItemFormat(binding, metadata.ItemFormat, params);
            }else if(metadata.ItemSelector){
                itemTemplate = this.buildItemSelector(binding, metadata.ItemSelector, params);
            }else{
                if(metadata.ItemProperty){
                    property = metadata.ItemProperty;
                }else{
                    property = '';
                }
                itemTemplate = this.buildItemProperty(binding, property, params);
            }

            element.setItemTemplate(itemTemplate);
        },

        initNotTemplatingItems: function(params){
            var itemsMetadata = params.metadata.Items;
            var element = params.element;
            var fakeItems = new Array(itemsMetadata.length);
            var itemTemplate = this.buildItemTemplateForUniqueItem(itemsMetadata, params);

            element.setItemTemplate(itemTemplate);
            element.getItems().addAll(fakeItems);
        }

    });
