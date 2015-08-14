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

        getItemTemplateBuilder: function () {
            if (!this.itemTemplateBuilder) {
                this.itemTemplateBuilder = new StackPanelItemTemplate();
            }
            return this.itemTemplateBuilder;
        },

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


            this.initItemsCollection(params);
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
        }

    });
