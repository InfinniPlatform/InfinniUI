function ListEditorBaseBuilder() {
    _.superClass(ListEditorBaseBuilder, this);

    editorBaseBuilderMixin.call(this);

}

_.inherit(ListEditorBaseBuilder, ContainerBuilder);

ListEditorBaseBuilder.prototype.applyMetadata = function (params) {

    ContainerBuilder.prototype.applyMetadata.call(this, params);
    editorBaseBuilderMixin.applyMetadata.call(this, params);

    var metadata = params.metadata;
    var element = params.element;

    if (typeof metadata.MultiSelect !== 'undefined' && metadata.MultiSelect !== null) {
        element.setMultiSelect(metadata.MultiSelect);
    }

    this.initValueSelector(params);
    this.initGroupValueSelector(params);

    if (metadata.OnSelectedItemChanged) {
        element.onSelectedItemChanged(function (context, args) {
            new ScriptExecutor(params.parent).executeScript(metadata.OnSelectedItemChanged.Name, args);
        });
    }

    //@TODO Build items DataBinding
    this.initItemsBinding(params);
};

ListEditorBaseBuilder.prototype.initGroupValueSelector = function (params) {
    var metadata = params.metadata,
        element = params.element,
        groupValueSelector;

    if (metadata.GroupValueSelector) {
        groupValueSelector = function (context, args) {
            var scriptExecutor = new ScriptExecutor(params.parent);
            return scriptExecutor.executeScript(metadata.GroupValueSelector.Name, args)
        };
    } else if (metadata.GroupValueProperty) {
        groupValueSelector = function (context, args) {
            return InfinniUI.ObjectUtils.getPropertyValue(args.value, metadata.GroupValueProperty);
        }
    } else {
        //Без группировки
        groupValueSelector = null
    }
    element.setGroupValueSelector(groupValueSelector);
};

ListEditorBaseBuilder.prototype.initValueSelector = function (params) {
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

    element.setValueComparator(new ComparatorId());
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
