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


        //binding.setConverter({
        //    toSource: toSource,
        //    toElement: toElement
        //});

        if (binding) {
            var ds = binding.getSource();
            var uploadProvider = ds.getUploadDataProvider();

            ds.on('onItemSaved', function (context, args) {
                var file = params.element.getFile();

                if (!file) {
                    return;
                }

                var idProperty = ds.getIdProperty();
                var instanceId = InfinniUI.ObjectUtils.getPropertyValue(ars.value, idProperty);

                uploadProvider.uploadFile(binding.getElementProperty(), instanceId, file, function() {
                    //@TODO Как-то уведомить DataSourсe что работа с ним закончена..
                });
            });

        }

        var file;

        params.element.onValueChanged(onValueChanged);

        //@TODO ds.afterSave(afterSave)

        function afterSave(instanceId) {
            if (typeof file === 'undefined') {
                return;
            }

            //  upload/delete file
            //@TODO uploadFile(instanceId, file)
        }

        function onValueChanged (context, args) {
            //get & store file's content
            //
            //@TODO file = loadFile();
            //
        }

        function toSource(context, args) {

        }

        function toElement(context, args) {

        }


    }

}, editorBaseBuilderMixin);