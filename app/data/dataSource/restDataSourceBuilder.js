function RestDataSourceBuilder() {
}

_.inherit(RestDataSourceBuilder, newBaseDataSourceBuilder);

_.extend(RestDataSourceBuilder.prototype, {
    createDataSource: function(parent){
        return new RestDataSource({
            view: parent
        });
    },

    applyMetadata: function(builder, parent, metadata, dataSource){
        newBaseDataSourceBuilder.prototype.applyMetadata.call(this, builder, parent, metadata, dataSource);

        var tmpParams;

        if('GettingParams' in metadata){
            tmpParams = this.extractUrlParams(metadata['GettingParams'], '.urlParams.get.params');
            dataSource.setGettingUrlParams(tmpParams);
        }

        if('Path' in metadata){
            dataSource.setPath(metadata['Path']);
        }

        if('Data' in metadata){
            dataSource.setPath(metadata['Data']);
        }

    },

    extractUrlParams: function(urlParamsMetadata, pathForBinding){
        var result = {};

        if('Origin' in urlParamsMetadata){
            result.origin = urlParamsMetadata['Origin'];
        }

        if('Path' in urlParamsMetadata){
            result.path = urlParamsMetadata['Path'];
        }

        if('Data' in urlParamsMetadata){
            result.data = urlParamsMetadata['Data'];
        }

        if('Params' in urlParamsMetadata){
            result.data = urlParamsMetadata['Data'];
        }
    }
});