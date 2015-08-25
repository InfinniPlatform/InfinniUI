var PropertyBindingBuilder = function () {

};

PropertyBindingBuilder.prototype.build = function (context, args) {

    var metadata = args.metadata,
        metadataProperty = metadata.Property;

    if(args.collectionProperty){
        metadataProperty = args.collectionProperty.resolve(metadata.Property);
    }

    //dataSourceObject = parent.getDataSource(metadata.DataSource);

    var propertyBinding = new PropertyBinding(args.view, metadata.DataSource, metadataProperty);


    if(metadata.DefaultValue) {
        propertyBinding.setPropertyValue(metadata.DefaultValue);
    }

    var dataSource = args.view.getDataSource(metadata.DataSource);

    if(dataSource !== null){
        var initingDataStrategy;

        if(args.params && args.params.lazyLoad){
            initingDataStrategy = {
                name: 'lazyInitingData',
                starter: args.params.lazyLoad
            };
        }

        dataSource.addDataBinding(propertyBinding, initingDataStrategy);

    }

    /** Переделать! **/
    propertyBinding.refresh = function (callback) {
        dataSource.resumeUpdate(callback);
    };

    return propertyBinding;
};