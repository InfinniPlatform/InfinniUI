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

        element.setReadOnly(metadata.ReadOnly);

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
                var sourceProperty = binding.getSourceProperty();
                var fileProvider = ds.getFileProvider();
                var url = null;
                //Формируем URL изображения

                if (value && value.Info && value.Info.ContentId && fileProvider) {
                    var instanceId = ds.lookupIdPropertyValue(sourceProperty);
                    if (typeof instanceId !== 'undefined') {
                        url = fileProvider.getFileUrl(binding.getSourceProperty(), instanceId);
                    }
                }
                return url;
            }
        };

        var data = this.applyMetadata_editorBaseBuilder(params, {
            //valueProperty: 'url',
            converter: converter
        });

        var binding = data.valueBinding;
        if (binding) {
            binding.setMode(BindingModes.toElement);

            var ds = binding.getSource();
            var fileProvider = ds.getFileProvider();

            params.element.onPropertyChanged('file', function (context, args) {
                var property = args.property,
                    file = args.newValue;

                //Файл в очередь на загрузк
                ds.setFile(file, binding.getSourceProperty());
            });

            //params.element.onPropertyChanged('value', function (context, args) {
            //    var url = null;
            //    var value = args.newValue;
            //    //Формируем URL изображения
            //    if (value && value.ContentId && fileProvider) {
            //        url = fileProvider.getFileUrl(binding.getSourceProperty(), value.ContentId);
            //    }
            //    params.element.setProperty('url', url);
            //});
        }

    }

}, editorBaseBuilderMixin);