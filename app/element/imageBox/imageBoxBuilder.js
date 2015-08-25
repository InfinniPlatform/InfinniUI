function ImageBoxBuilder() {
}

_.inherit(ImageBoxBuilder, ElementBuilder);

_.extend(ImageBoxBuilder.prototype, {

        applyMetadata: function(params){
            ElementBuilder.prototype.applyMetadata.call(this, params);

            var element = params.element;
            params.element.setReadOnly(params.metadata.ReadOnly);
            this.initScriptsHandlers(params);
            var binding  = this.initValueProperty(params);

            var getUrl = binding.getFileUrl || binding.getPropertyValue;

            element.onValueChanged(function (dataSourceName, value) {
                var file = element.getFile();
                if (typeof binding.setFile === 'function') {
                    binding.setFile(file);
                }
            });

            element.onUrlChanged(function () {
                var url = element.getUrl();
                if (typeof binding.setFileUrl === 'function') {
                    binding.setFileUrl(url);
                }
            });

            binding.onPropertyValueChanged(function (dataSourceName, value) {
                element.setUrl(getUrl.call(binding));
            });

            element.setUrl(getUrl.call(binding));

        },

        createElement: function(params){
            var imageBox = new ImageBox(params.view);
            if(params.metadata.ReadOnly !== undefined) imageBox.setReadOnly(params.metadata.ReadOnly);
            if(params.metadata.MaxSize !== undefined) imageBox.setMaxSize(params.metadata.MaxSize);

            return imageBox;
        },

        initScriptsHandlers: function(params){
            var metadata = params.metadata;

            //Скриптовые обработчики на события
            if (params.view && metadata.OnLoaded){
                params.element.onLoaded(function() {
                    new ScriptExecutor(params.view).executeScript(metadata.OnLoaded.Name);
                });
            }

            if (params.view && metadata.OnValueChanged){
                params.element.onValueChanged(function() {
                    new ScriptExecutor(params.view).executeScript(metadata.OnValueChanged.Name);
                });
            }
        }

    },
    builderValuePropertyMixin
);