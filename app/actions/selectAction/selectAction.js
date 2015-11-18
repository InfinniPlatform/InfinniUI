function SelectAction(parentView){
    _.superClass(SelectAction, this, parentView);
}

_.inherit(SelectAction, BaseAction);


_.extend(SelectAction.prototype, {
    execute: function(callback){
        var linkView = this.getProperty('linkView');

        var srcDataSourceName = this.getProperty('srcDataSourceName');
        var srcPropertyName = this.getProperty('srcPropertyName');

        var dstDataSourceName = this.getProperty('dstDataSourceName');
        var dstPropertyName = this.getProperty('dstPropertyName');

        linkView.createView(function(createdView){

            createdView.onClosed(function () {
                var dialogResult = createdView.getDialogResult();

                if (dialogResult == DialogResult.accepted) {
                    var srcDataSource = createdView.getContext().dataSources[srcDataSourceName];
                    var dstDataSource = createdView.getContext().dataSources[dstDataSourceName];

                    var value = srcDataSource.getProperty(srcPropertyName);
                    dstDataSource.setProperty(srcPropertyName, value);

                    if (callback) {
                        callback(value);
                    }
                }
            });

            createdView.open();
        });
    }
});