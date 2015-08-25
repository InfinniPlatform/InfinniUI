function UploadFileBoxBuilder() {
}

_.inherit(UploadFileBoxBuilder, ElementBuilder);

_.extend(UploadFileBoxBuilder.prototype, {

        applyMetadata: function(params){
            ElementBuilder.prototype.applyMetadata.call(this, params);

            var element = params.element;
            this.initScriptsHandlers(params);
            var binding  = this.initValueProperty(params);
            var getUrl = binding.getFileUrl || binding.getPropertyValue;

            element.onValueChanged(function (dataSourceName, value) {
                var file = element.getFile();
                if (typeof binding.setFile === 'function') {
                    binding.setFile(file);
                }
            });

            binding.onPropertyValueChanged(function (dataSourceName, value) {
                element.setUrl(getUrl.call(binding));
            });

            element.setUrl(getUrl.call(binding));
        },

        createElement: function(params){
            var element = new UploadFileBox(params.view);
            var metadata = params.metadata;

            if(_.isBoolean(metadata.ReadOnly)){
                element.setReadOnly(metadata.ReadOnly);
            }
            if(_.isNumber(metadata.MaxSize) && !isNaN(metadata.MaxSize)) {
                element.setMaxSize(metadata.MaxSize);
            }
            if (_.isArray(metadata.AcceptTypes)) {
                element.setAcceptTypes(metadata.AcceptTypes);
            }

            return element;
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