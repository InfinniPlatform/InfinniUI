function ListEditorBaseBuilder() {
    _.superClass(ListEditorBaseBuilder, this);

    editorBaseBuilderMixin.call(this);
}

_.inherit(ListEditorBaseBuilder, ContainerBuilder);


_.extend(ListEditorBaseBuilder.prototype, {

    applyMetadata: function (params) {
        ContainerBuilder.prototype.applyMetadata.call(this, params);
        editorBaseBuilderMixin.applyMetadata.call(this, params);

        this.initItems(params);
        this.initGroup(params);
        this.initValueFeatures(params);
    },

    initItems: function(params){
        var itemsBinding = this.initItemsBinding(params);
        this.initItemTemplating(params);
        //this.initSorting(params);
        this.initSelecting(params, itemsBinding);
    },

    initItemsBinding: function(params){
        var metadata = params.metadata;
        var element = params.element;
        var binding;

        binding = params.builder.build(metadata.Items, {
            parentView: params.parentView,
            basePathOfProperty: params.basePathOfProperty
        });

        binding.bindElement(element, 'items');

        return binding;
    },

    initItemTemplating: function(params){
        var metadata = params.metadata;
        var element = params.element;
        var itemTemplate;

        if(metadata.ItemTemplate){
            itemTemplate = this.buildItemTemplate(metadata.ItemTemplate, params);
            element.setItemTemplate(itemTemplate);
        }else {
            throw 'Нужно обработать другие варианты элементов';
        }
    },


    initSelecting: function(params, itemsBinding){
        var metadata = params.metadata;
        var element = params.element;
        var dataSource = itemsBinding.getSource();

        dataSource.setSelectedItem(null);

        dataSource.onSelectedItemChanged(function(context, args){
            element.setSelectedItem(args.value);
        });

        element.onSelectedItemChanged(function(context, args){
            dataSource.setSelectedItem(args.value);

            if (metadata.OnSelectedItemChanged) {
                new ScriptExecutor(params.parent).executeScript(metadata.OnSelectedItemChanged.Name, args);
            }
        });
    },

    initGroup: function(params){
        if(this.hasGrouping(params)){
            this.initGroupValueSelector(params);
            this.initGroupItemTemplate(params);
        }
    },

    hasGrouping: function(params){
        return params.metadata.GroupValueSelector || params.metadata.GroupValueProperty;
    },

    initGroupValueSelector: function (params) {
        var metadata = params.metadata,
            element = params.element,
            groupValueSelector;

       /* element.setGroupItemComparator(function(a, b) {
            if (a < b) {
                return -1;
            }

            if (a > b) {
                return 1;
            }

            return 0;
        });*/

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
    },

    initGroupItemTemplate: function(params){
        var metadata = params.metadata;
        var element = params.element;
        var itemTemplate;

        if(metadata.GroupItemTemplate){
            itemTemplate = this.buildItemTemplate(metadata.GroupItemTemplate, params);
            element.setGroupItemTemplate(itemTemplate);
        }else {
            throw 'Нужно обработать другие варианты элементов';
        }
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

        element.setValueComparator(new ComparatorId());
    }
});
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