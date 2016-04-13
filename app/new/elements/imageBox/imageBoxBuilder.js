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

                if (value) {
                    if (value.Info && value.Info.ContentId && fileProvider) {
                        url = fileProvider.getFileUrl(null, null, value.Info.ContentId);
                    } else if (typeof value === 'string') {
                        //@TODO Добавить проверку на валидность URI
                        url = value;
                    } else {
                        //Native File instance from FileAPI
                        url = value;
                    }
                }
                return url;
            }

        };

        var data = this.applyMetadata_editorBaseBuilder(params, {
            converter: converter
        });

        var binding = data.valueBinding;
        if (binding) {
            binding.setMode(InfinniUI.BindingModes.toElement);

            var ds = binding.getSource();

            params.element.onPropertyChanged('file', function (context, args) {
                var file = args.newValue;

                if (file instanceof File) {
                    ds.setProperty(binding.getSourceProperty(), args.newValue)
                }
            });

            ds.onItemsUpdated(function (context, args) {
                /**
                 * @TODO Принудительное обновление изображений. Удалить после изменений на backend'е,
                 * когда будет изменяться BlobInfo
                 */
                var element = params.element;
                var url = element.getValue();
                var pattern = /&salt=.*$/;
                if (url) {
                    var salt = '&salt=' + Date.now();
                    if (pattern.test(url)) {
                        url.replace(pattern, salt);
                    } else {
                        url += salt;
                    }
                    element.setValue(url);
                }
            });
        }

    }

}, editorBaseBuilderMixin);