function SaveItemActionBuilder(metadataView) {

    var baseItemActionBuilder = null;

    var parentView = null;

    this.build = function (builder, parent, metadata) {
        var action = new BaseItemAction();

        var that = this;
        action.setAction(function (callback) {
            that.executeAction(builder, action, metadataView, callback);
        });

        parentView = parent;

        return action;
    };

    this.executeAction = function (builder, action, metadata, callback) {
        if (callback) {
            parentView.onClosed(function () {
                callback();
            });
        }
        parentView.close(dialogResult.accept);
    }
}