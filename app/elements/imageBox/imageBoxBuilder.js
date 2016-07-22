/**
 *
 * @constructor
 * @augments ElementBuilder
 * @mixes editorBaseBuilderMixin
 */
function ImageBoxBuilder() {
    _.superClass(ImageBoxBuilder, this);
    this.initialize_editorBaseBuilder();
}

_.inherit(ImageBoxBuilder, ElementBuilder);

_.extend(ImageBoxBuilder.prototype, {

    createElement: function (params) {
        return new ImageBox(params.parent);
    },

    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);

        var element = params.element;
        var metadata = params.metadata;

        if (Array.isArray(metadata.AcceptTypes)) {
            element.setAcceptTypes(metadata.AcceptTypes);
        }

        if (metadata.MaxSize !== null && typeof metadata.MaxSize !== 'undefined') {
            element.setMaxSize(metadata.MaxSize);
        }

        // Привязка данных односторонняя т.к.:
        // 1. по значению из источника данных - сформировать URL изображения.
        // 2. при выборе в элементе файла на загрузку - добавить выбранный файл в очередь на загрузку

        var converter = new ImageBoxValueConverter(element);

        var data = this.applyMetadata_editorBaseBuilder(params, {
            mode: InfinniUI.BindingModes.toElement,
            converter: converter
        });

        var binding = data.valueBinding;
        if (binding) {
            var ds = binding.getSource();

            params.element.onPropertyChanged('file', function (context, args) {
                var file = args.newValue;

                if (file instanceof File || file === null) {
                    ds.setProperty(binding.getSourceProperty(), args.newValue)
                }
            });
        }

    }

}, editorBaseBuilderMixin);