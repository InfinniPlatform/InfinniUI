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

        this.initBindingToProperty(params, 'LabelText');

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
                var info = {};
                //Формируем ссылку для получения файла
                if (value) {
                    if (value.Info && value.Info.ContentId && fileProvider) {
                        url = fileProvider.getFileUrl(null, null, value.Info.ContentId);
                        element.setFileName(value.Info.Name)
                            .setFileSize(value.Info.Size)
                            .setFileTime(value.Info.Time)
                            .setFileType(value.Info.Type);

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

                if (file === null) {
                    ds.setProperty(binding.getSourceProperty(), null)
                } else  if (file instanceof File) {
                    ds.setProperty(binding.getSourceProperty(), args.newValue)
                }
            })
        }

    }

}, editorBaseBuilderMixin);