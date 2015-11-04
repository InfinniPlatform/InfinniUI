/**
 * @augments ListEditorBaseBuilder
 * @constructor
 */
function ComboBoxBuilder() {
    _.superClass(ComboBoxBuilder, this);
}

_.inherit(ComboBoxBuilder, ListEditorBaseBuilder);

_.extend(ComboBoxBuilder.prototype, /** @lends ComboBoxBuilder.prototype */{

    createElement: function (params) {
        return new ComboBox(params.parent);
    },

    applyMetadata: function (params) {
        var data = ListEditorBaseBuilder.prototype.applyMetadata.call(this, params);
        this.initValueTemplate(data.valueBinding, params);
        params.element.setLabelText(params.metadata.LabelText);
    },

    initValueTemplate: function (binding, params) {

        var metadata = params.metadata;
        var element = params.element;
        var valueTemplate;
        var property;


        if ('ValueTemplate' in metadata) {
            valueTemplate = this.buildValueTemplate(metadata.ValueTemplate, params);
        } else if ('ValueFormat' in metadata) {
            valueTemplate = this.buildValueTemplateByFormat(binding, metadata.ValueFormat, params);
        } else {
            valueTemplate = this.buildValueTemplateByDefault(binding, params);
        }

        element.setValueTemplate(valueTemplate);
    },

    buildValueTemplate: function (templateMetadata, params) {
        var element = params.element;
        var builder = params.builder;
        var basePathOfProperty = params.basePathOfProperty || new BasePathOfProperty('');
        var that = this;

        return function (context, args) {
            var index = args.index;
            var bindingIndex;
            var argumentForBuilder = {
                parent: params.element,
                parentView: params.parentView
            };

            if (index !== undefined && index !== null) {
                //bindingIndex = that.bindingIndexByItemsIndex(index, params);
                bindingIndex = index;

                if (bindingIndex !== undefined && bindingIndex !== null) {
                    argumentForBuilder.basePathOfProperty = basePathOfProperty.buildChild('', bindingIndex);
                } else {
                    argumentForBuilder.basePathOfProperty = basePathOfProperty.buildChild('', index);
                }
            }

            return builder.build(templateMetadata, argumentForBuilder);
        };
    },

    buildValueTemplateByFormat: function (binding, valueFormatMetadata, params) {
        var format = this.buildDisplayFormat(valueFormatMetadata, params);
        return function (context, args) {
            var index = args.index;
            var value = args.value;

            var label = new Label(this);
            label.setHorizontalAlignment('Left');
            label.setDisplayFormat(format);
            var labelBinding = new DataBinding(this);
            labelBinding.setMode(BindingModes.toElement);

            var source = binding.getSource();
            var property = binding.getSourceProperty();

            if (params.element.getMultiSelect()) {
                if (property && property !== '') {
                    property = [property, index].join('.');
                } else {
                    property = String(index);
                }
            }

            labelBinding.bindSource(source, property);
            labelBinding.bindElement(label, 'value');

            return label;
        };
        //return function(context, args){
        //    var index = args.index;
        //    var label = new Label(this);
        //
        //    label.setDisplayFormat(format);
        //    label.setValue(format.call(null, args));
        //    return label;
        //};
    },

    buildValueTemplateByDefault: function (binding, params) {
        return function (context, args) {
            var index = args.index;
            var value = args.value;

            var label = new Label(this);
            label.setHorizontalAlignment('Left');
            var labelBinding = new DataBinding(this);
            labelBinding.setMode(BindingModes.toElement);

            var source = binding.getSource();
            var property = binding.getSourceProperty();

            if (params.element.getMultiSelect()) {
                if (property && property !== '') {
                    property = [property, index].join('.');
                } else {
                    property = String(index);
                }
            }

            labelBinding.bindSource(source, property);
            labelBinding.bindElement(label, 'value');

            return label;
        };
    }
});