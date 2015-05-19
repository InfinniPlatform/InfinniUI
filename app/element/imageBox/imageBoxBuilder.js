function ImageBoxBuilder() {
}

_.inherit(ImageBoxBuilder, ElementBuilder);

_.extend(ImageBoxBuilder.prototype, {

        applyMetadata: function(params){
            ElementBuilder.prototype.applyMetadata.call(this, params);

            var element = params.element;
            this.initScriptsHandlers(params);
            var binding  = this.initValueProperty(params);

            element.onValueChanged(function (dataSourceName, value) {
                var file = element.getFile();
                binding.setFile(file);
            });

            binding.onPropertyValueChanged(function (dataSourceName, value) {
                element.setUrl(binding.getFileUrl());
            });

        },

        createElement: function(params){
            var imageBox = new ImageBox(params.parent);
            if(params.metadata.ReadOnly !== undefined) imageBox.setReadOnly(params.metadata.ReadOnly);
            if(params.metadata.MaxSize !== undefined) imageBox.setMaxSize(params.metadata.MaxSize);

            return imageBox;
        },

        initScriptsHandlers: function(params){
            var metadata = params.metadata;

            //Скриптовые обработчики на события
            if (params.parent && metadata.OnLoaded){
                params.element.onLoaded(function() {
                    new ScriptExecutor(params.parent).executeScript(metadata.OnLoaded.Name);
                });
            }

            if (params.parent && metadata.OnValueChanged){
                params.element.onValueChanged(function() {
                    new ScriptExecutor(params.parent).executeScript(metadata.OnValueChanged.Name);
                });
            }
        }

    },
    builderValuePropertyMixin
);