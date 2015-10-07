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

        // Привязка данных односторонняя т.к.:
        // 1. по значению из источника данных - сформировать URL изображения.
        // 2. при выборе в элементе файла на загрузку - добавить выбранный файл в очередь на загрузку

        var binding = this.applyMetadata_editorBaseBuilder(params, {
                valueProperty: 'url',
                mode: 'toElement'
            }
        );

        if (binding) {
            var ds = binding.getSource();
            var fileProvider = ds.getFileProvider();

            binding.setConverter({
                toElement: function (context, args) {
                    var value = args.value;
                    var id = InfinniUI.ObjectUtils.getPropertyValue(ds.getSelectedItem(), ds.getIdProperty());
                    //Формируем URL изображения
                    return fileProvider.getFileUrl(binding.getSourceProperty(), id);
                }
            });

            params.element.onPropertyChanged(function (context, args) {
                var property = args.property,
                    value = args.value;

                if (property !== 'file') {
                    return;
                }
                //Файл в очередь на загрузк
                ds.setFile(binding.getSourceProperty(), file);
            })
        }

    }

}, editorBaseBuilderMixin);