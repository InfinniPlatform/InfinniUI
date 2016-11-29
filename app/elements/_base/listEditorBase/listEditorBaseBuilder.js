function ListEditorBaseBuilder() {
    _.superClass(ListEditorBaseBuilder, this);

    this.initialize_editorBaseBuilder();
}

window.InfinniUI.ListEditorBaseBuilder = ListEditorBaseBuilder;

_.inherit(ListEditorBaseBuilder, ContainerBuilder);


_.extend(ListEditorBaseBuilder.prototype, {

    applyMetadata: function (params) {

        var applyingMetadataResult = ContainerBuilder.prototype.applyMetadata.call(this, params),
            itemsBinding = applyingMetadataResult.itemsBinding,
            applyingMetadataResult2;

        this.initSelecting(params, itemsBinding);
        this.initDisabledItemCondition(params);

        this.initValueFeatures(params);

        applyingMetadataResult2 = this.applyMetadata_editorBaseBuilder(params);
        return _.extend(applyingMetadataResult, applyingMetadataResult2);
    },


    initSelecting: function(params, itemsBinding){
        var metadata = params.metadata;
        var element = params.element;
        var source = itemsBinding.getSource();
        var sourceProperty = itemsBinding.getSourceProperty();
        var isBindingOnWholeDS = sourceProperty == '',
            sourceIsDataSource = source instanceof InfinniUI.BaseDataSource;

        if(sourceIsDataSource && isBindingOnWholeDS){
            source.setSelectedItem(null);

            source.onSelectedItemChanged(function(context, args){
                var currentSelectedItem = element.getSelectedItem(),
                    newSelectedItem = args.value;

                if(newSelectedItem != currentSelectedItem){
                    element.setSelectedItem(newSelectedItem);
                }
            });
        }

        element.onSelectedItemChanged(function(context, args){

            if(sourceIsDataSource && isBindingOnWholeDS) {
                var currentSelectedItem = source.getSelectedItem(),
                    newSelectedItem = args.value;

                if (newSelectedItem != currentSelectedItem) {
                    source.setSelectedItem(newSelectedItem);
                }
            }

            if (metadata.OnSelectedItemChanged) {
                new ScriptExecutor(element.getScriptsStorage()).executeScript(metadata.OnSelectedItemChanged.Name || metadata.OnSelectedItemChanged, args);
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
                var scriptExecutor = new ScriptExecutor(params.element.getScriptsStorage());
                return scriptExecutor.executeScript(metadata.ValueSelector.Name || metadata.ValueSelector, args)
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
    },

    initDisabledItemCondition: function (params) {
        var metadata = params.metadata,
            element = params.element,
            disabledItemCondition;

        if (metadata.DisabledItemCondition) {
            disabledItemCondition = function (context, args) {
                var scriptExecutor = new ScriptExecutor(element.getScriptsStorage());
                return scriptExecutor.executeScript(metadata.DisabledItemCondition.Name || metadata.DisabledItemCondition, args)
            };
        }

        element.setDisabledItemCondition(disabledItemCondition);
    }
}, editorBaseBuilderMixin);
