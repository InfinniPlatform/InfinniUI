function ListEditorBaseBuilder() {
    _.superClass(ListEditorBaseBuilder, this);

    this.initialize_editorBaseBuilder();
}

_.inherit(ListEditorBaseBuilder, ContainerBuilder);


_.extend(ListEditorBaseBuilder.prototype, {

    applyMetadata: function (params) {
        var itemsBinding;

        var data = ContainerBuilder.prototype.applyMetadata.call(this, params);
        itemsBinding = data.itemsBinding;

        this.initSelecting(params, itemsBinding);

        this.initValueFeatures(params);

        return _.extend(data, this.applyMetadata_editorBaseBuilder(params));
    },


    initSelecting: function(params, itemsBinding){
        var metadata = params.metadata;
        var element = params.element;
        var dataSource = itemsBinding.getSource();
        var sourceProperty = itemsBinding.getSourceProperty();
        var isBindingOnWholeDS = sourceProperty == '';
        var that = this;

        if(isBindingOnWholeDS){
            dataSource.setSelectedItem(null);

            dataSource.onSelectedItemChanged(function(context, args){
                var currentSelectedItem = element.getSelectedItem(),
                    newSelectedItem = args.value;

                if(newSelectedItem != currentSelectedItem){
                    element.setSelectedItem(newSelectedItem);
                }
            });
        }

        element.onSelectedItemChanged(function(context, args){
            var currentSelectedItem = dataSource.getSelectedItem(),
                newSelectedItem = args.value;

            if(isBindingOnWholeDS && newSelectedItem != currentSelectedItem){
                dataSource.setSelectedItem(newSelectedItem);
            }

            if (metadata.OnSelectedItemChanged) {
                new ScriptExecutor(params.parent).executeScript(metadata.OnSelectedItemChanged.Name, args);
            }
        });
    },

    initValueFeatures: function(params){
        var metadata = params.metadata;
        var element = params.element;

        if (typeof metadata.MultiSelect !== 'undefined' && metadata.MultiSelect !== null) {
            element.setMultiSelect(metadata.MultiSelect);
        }

        this.initValueSelector(params);
    },

    initValueSelector: function (params) {
        var metadata = params.metadata,
            element = params.element,
            valueSelector;

        if (metadata.ValueSelector) {
            valueSelector = function (context, args) {
                var scriptExecutor = new ScriptExecutor(params.parent);
                return scriptExecutor.executeScript(metadata.ValueSelector.Name, args)
            };
        } else if (metadata.ValueProperty) {
            valueSelector = function (context, args) {
                return InfinniUI.ObjectUtils.getPropertyValue(args.value, metadata.ValueProperty);
            }
        } else {
            valueSelector = function (context, args) {
                return args.value;
            }
        }
        element.setValueSelector(valueSelector);
    }
}, editorBaseBuilderMixin);
/*
    initValue: function(params){
        var metadata = params.metadata;
        var element = params.element;

        if (typeof metadata.MultiSelect !== 'undefined' && metadata.MultiSelect !== null) {
            element.setMultiSelect(metadata.MultiSelect);
        }

        this.initValueSelector(params);
    }
});


ListEditorBaseBuilder.prototype.initGroupItemTemplate = function (params) {
};

ListEditorBaseBuilder.prototype.initGroupItemTemplate = function (params) {
};


ListEditorBaseBuilder.prototype.getGroupItemTemplateBuilder = function () {
    throw new Error('Не перекрыт метод getGroupItemTemplateBuilder')
};

ListEditorBaseBuilder.prototype.initItemsBinding = function (params) {
    var element = params.element;
    var metadata = params.metadata.Items;
    var itemsCollection = element.getItems();
    if(!metadata) {
        return;
    }

    var binding = params.builder.build(params.parent, metadata, params.collectionProperty);

    if (typeof binding !== 'undefined' && binding !== null) {
        binding.onPropertyValueChanged(function (context, argument) {
            var newItems = argument.value;

            if (!Array.isArray(newItems)) {
                itemsCollection.clear();
                return;
            }

            //Удалить элементы, которых нет в новых данных
            itemsCollection
                .filter(function (item) {
                    return newItems.indexOf(item) === -1;
                })
                .forEach(function(item) {
                    itemsCollection.remove(item);
                });

            //Добавить новые элементы,которые появились в данных
            newItems.filter(function (item) {
                    return !itemsCollection.contains(item)
                })
                .forEach(function(item){
                    itemsCollection.add(item);
                });

        });
    }
    return binding;
};
*/