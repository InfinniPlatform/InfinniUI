var PropertyBindingBuilder = function () {

};

PropertyBindingBuilder.prototype.build = function (builder, parent, metadata, collectionProperty) {

    var metadataProperty = metadata.Property;

    if(collectionProperty){

        metadataProperty = collectionProperty.resolve(metadata.Property);
    }

    //dataSourceObject = parent.getDataSource(metadata.DataSource);

    var propertyBinding = new PropertyBinding(parent, metadata.DataSource, metadataProperty);


    if(metadata.DefaultValue) {
        propertyBinding.setPropertyValue(metadata.DefaultValue);
    }

    var dataSource = parent.getDataSource(metadata.DataSource);

    if(dataSource !== null){

        dataSource.addDataBinding(propertyBinding);

    }

    /** Переделать! **/
    propertyBinding.refresh = function (callback) {
        dataSource.resumeUpdate(callback);
    };

    return propertyBinding;
};