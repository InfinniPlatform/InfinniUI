function SelectAction(parentView){
    _.superClass(SelectAction, this, parentView);
}

_.inherit(SelectAction, BaseAction);


_.extend(SelectAction.prototype, {
    execute: function(callback){
        var parentView = this.parentView;
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
                    var dstDataSource = parentView.getContext().dataSources[dstDataSourceName];

                    var value = srcDataSource.getProperty(srcPropertyName);
                    dstDataSource.setProperty(dstPropertyName, value);

                    if (callback) {
                        callback(value);
                    }
                }
            });

            createdView.open();
        });
    }
});