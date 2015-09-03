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
            //this.initItemsCollection(params);
        },

        initItemTemplate: function (params) {
            var
            //metadata = params.metadata,
                element = params.element,
                builder = params.builder,
                parent = params.parent,
                itemTemplate;

            itemTemplate = function (context, argument) {
                var index = argument.index;
                var item = argument.item;
                var collectionProperty = new ListBoxItemCollectionProperty(/*metadata.Items.PropertyBinding.Property*/'', index, params.collectionProperty);

                return builder.build(parent, item/*, collectionProperty*/);
            };

            element.setItemTemplate(itemTemplate);
        },

        /**
         *
         * @param {Object} params
         * @param {StackPanel} params.element
         */
        initItemsCollection: function (params) {
            var metadata = params.metadata;
            var element = params.element;
            var itemsCollection = element.getItems();

            if (metadata.Items) {
                itemsCollection.reset(metadata.Items);
            }
        },

        initItems: function(params){
            var metadata = params.metadata;
            var element = params.element;
            var itemTemplate;
            var binding;

            if($.isArray(metadata.Items)){
                throw 'Нужно реализовать создание элементов как они были';
            }else{
                binding = params.builder.build(metadata.Items, {
                    parentView: params.parentView,
                    basePathOfProperty: params.basePathOfProperty
                });

                binding.bindElement(element, 'items');

                if(metadata.ItemTemplate){
                    itemTemplate = this.buildItemTemplate(metadata.ItemTemplate, params);
                    element.setItemTemplate(itemTemplate);
                }else{
                    throw 'Нужно обработать другие варианты элементов';
                }
            }


        }

    });
