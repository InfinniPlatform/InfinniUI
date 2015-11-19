var DataBindingBuilder = function () {};

DataBindingBuilder.prototype.build = function (context, args) {
    var result = new DataBinding();
    var metadata = args.metadata;
    var logger = window.InfinniUI.global.logger;
    var property;

    if(metadata.Source == null){
        logger.error('DataBindingBuilder: не указан источник.');
        throw new Error('DataBindingBuilder: not declared source in DataBinding metadata.');
    }

    var source = this.findSource(args.parentView, metadata.Source);
    if(source == null){
        logger.error('DataBindingBuilder: некорректный источник.');
        throw new Error('DataBindingBuilder: declared source not found.');
    }

    if(args.basePathOfProperty){
        property = args.basePathOfProperty.resolveProperty(metadata.Property);
    }else{
        property = metadata.Property;
    }
    result.bindSource(source, property);

    if(metadata.Mode){
        result.setMode(metadata.Mode);
    }

    if(metadata.Converter){
        result.setConverter(metadata.Converter);
    }

    return result;
};

DataBindingBuilder.prototype.findSource = function(view, sourceName){
    var context = view.getContext();
    var dataSource = context.dataSources[sourceName];
    var parameter = context.parameters[sourceName];
    var element = context.controls[sourceName];
    return dataSource || parameter || element;
};
