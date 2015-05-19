function UploadFileBoxBuilder() {
}

_.inherit(UploadFileBoxBuilder, ElementBuilder);

_.extend(UploadFileBoxBuilder.prototype, {

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
            var element = new UploadFileBox(params.parent);
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