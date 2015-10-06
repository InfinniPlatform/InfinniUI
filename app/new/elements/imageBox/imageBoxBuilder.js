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
        var binding = this.applyMetadata_editorBaseBuilder(params);

        if (binding) {
            var ds = binding.getSource();
            var uploadProvider = ds.getUploadDataProvider();

            binding.setConverter({
                toSource: toSource,
                toElement: toElement
            });

        }


        function toSource(context, args) {
            var value = args.value;
            //@TODO Добавить файл в очередь на загрузку:
            //ds.setFile(params.element.getFile(), binding.getElementProperty());
        }

        function toElement(context, args) {
            var value = args.value;

            //@TODO Сгенерировать URL ч/з ds.fileProvider
            //@TODO params.element.setURL(url);
        }


    }

}, editorBaseBuilderMixin);