/**
 *
 * @constructor
 * @augments ElementBuilder
 * @mixes editorBaseBuilderMixin
 */
function FileBoxBuilder() {
    _.superClass(FileBoxBuilder, this);
    this.initialize_editorBaseBuilder();
}

_.inherit(FileBoxBuilder, ElementBuilder);

_.extend(FileBoxBuilder.prototype, {

    createElement: function (params) {
        return new FileBox(params.parent);
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

        var converter = {
            toElement: function (context, args) {
                var value = args.value;
                var binding = args.binding;
                var ds = binding.getSource();
                var fileProvider = ds.getFileProvider();
                var url = null;
                //Формируем URL изображения
                if (value && value.ContentId && fileProvider) {
                    url = fileProvider.getFileUrl(binding.getSourceProperty(), value.ContentId);
                }
                return url;
            }
        };

        var binding = this.applyMetadata_editorBaseBuilder(params, {
            valueProperty: 'url',
            converter: converter
        });

        if (binding) {
            binding.setMode(BindingModes.toElement);

            params.element.onPropertyChanged('file', function (context, args) {
                var ds = binding.getSource();
                var property = args.property,
                    value = args.value;

                //Файл в очередь на загрузк
                ds.setFile(binding.getSourceProperty(), value);
            })
        }

    }

}, editorBaseBuilderMixin);