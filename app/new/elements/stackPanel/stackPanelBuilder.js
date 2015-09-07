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

            if($.isArray(metadata.Items)){  // ��������� �� ��������������� items, � metadata.Items - ������ ���������� item'��
                this.initNotTemplatingItems(params);
            }else{                          // ��������������� ���������� items, � metadata.Items - ������� �� ������ item'��
                this.initTemplatingItems(params);
            }
        },

        initTemplatingItems: function(params){
            var metadata = params.metadata;
            var element = params.element;
            var itemTemplate;
            var binding;

            binding = params.builder.build(metadata.Items, {
                parentView: params.parentView,
                basePathOfProperty: params.basePathOfProperty
            });

            binding.bindElement(element, 'items');

            if(metadata.ItemTemplate){
                itemTemplate = this.buildItemTemplate(metadata.ItemTemplate, params);
                element.setItemTemplate(itemTemplate);
            }else{
                throw '����� ���������� ������ �������� ���������';
            }
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
