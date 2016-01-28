var DataBindingBuilder = function () {};

DataBindingBuilder.prototype.build = function (context, args) {
    var result = new DataBinding();
    var metadata = args.metadata;
    var logger = window.InfinniUI.global.logger;
    var converter = {};
    var property;
    var scriptName;


    if(metadata.Source == null){
        logger.error('DataBindingBuilder: не указан источник.');
        throw new Error('DataBindingBuilder: not declared source in DataBinding metadata.');
    }


    var sourceDeferred = args.parentView.getDeferredOfMember(metadata.Source);
    sourceDeferred.done(function(source){
        var metadataProperty = typeof metadata.Property === 'undefined' || metadata.Property === null ? "" : metadata.Property;

        if(args.basePathOfProperty){
            property = args.basePathOfProperty.resolveProperty(metadataProperty);
        }else{
            property = metadataProperty;
        }
        result.bindSource(source, property);

        if(metadata.Mode){
            result.setMode(metadata.Mode);
        }

        if(metadata.Converter){
            if(metadata['Converter']['ToSource']){
                scriptName = metadata['Converter']['ToSource'];
                converter.toSource = this.scriptByNameOrBody(scriptName, context);
            }
            if(metadata['Converter']['ToElement']){
                scriptName = metadata['Converter']['ToElement'];
                converter.toElement = this.scriptByNameOrBody(scriptName, context);
            }
            result.setConverter(converter);
        }
    });

    return result;
};

DataBindingBuilder.prototype.findSource = function(view, sourceName){
    var context = view.getContext();
    var dataSource = context.dataSources[sourceName];
    var parameter = context.parameters[sourceName];
    var element = context.controls[sourceName];
    return dataSource || parameter || element;
};

DataBindingBuilder.prototype.isScriptBody = function(value){
    return value && value.substr(0, 1) == '{';
};

DataBindingBuilder.prototype.scriptByNameOrBody = function(nameOrBody, context){
    if(this.isScriptBody(nameOrBody)){
        var scriptExecutor = new ScriptExecutor(context.view);
        return scriptExecutor.buildScriptByBody(nameOrBody);
    }else{
        return context.scripts[nameOrBody];
    }

};
