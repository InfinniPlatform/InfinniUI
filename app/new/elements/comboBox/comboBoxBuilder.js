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
        ListEditorBaseBuilder.prototype.applyMetadata.call(this, params);
    },

    buildValueTemplate: function (params) {

        var metadata = params.metadata;
        var element = params.element;
        var valueTemplate;
        var property;


        if ('ValueTemplate' in metadata) {
            valueTemplate = this.buildValueTemplate(metadata.ValueTemplate, params);
        } else if ('ValueFormat' in metadata) {
            valueTemplate = this.buildValueTemplateByFormat(metadata.ValueFormat, params);
        } else {
            valueTemplate = this.buildValueTemplateByDefault(params);
        }

        element.setValueTemplate(valueTemplate);
    },

    buildValueTemplate: function (valueTemplateMetadata, params) {

    },

    buildValueTemplateByFormat: function (valueFormatMetadata, params) {
        var format = this.buildDisplayFormat(valueFormatMetadata, params);
        return function(context, args){
            var index = args.index;
            var label = new Label(this);

            label.setDisplayFormat(format);
            label.setValue(format.call(null, args));
            return label;
        };
    },

    buildValueTemplateByDefault: function (params) {
        return function (context, args) {
            var index = args.index;
            var value = args.value;

            var label = new Label(this);


            label.setValue(value);
            return label;
        };
    }
});