function ObjectDataSourceBuilder() {
}

_.inherit(ObjectDataSourceBuilder, BaseDataSourceBuilder);

_.extend(ObjectDataSourceBuilder.prototype, {
    createDataSource: function(parent){
        return new ObjectDataSource({
            view: parent
        });
    }
});