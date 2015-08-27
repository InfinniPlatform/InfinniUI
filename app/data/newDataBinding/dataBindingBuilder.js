var DataBindingBuilder = function () {};

DataBindingBuilder.prototype.build = function (builder, parent, metadata) {
    var result = new DataBinding();

    if(metadata.Source == null){
        logger.error('DataBindingBuilder: не указан источник.');
        throw new Error('DataBindingBuilder: not declared source in DataBinding metadata.');
    }

    var source = this.findSource(parent, metadata.Source);
    if(source == null){
        logger.error('DataBindingBuilder: некорректный источник.');
        throw new Error('DataBindingBuilder: declared source not found.');
    }

    result.bindSource(source, metadata.Property);

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
