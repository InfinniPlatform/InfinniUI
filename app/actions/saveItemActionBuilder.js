function SaveItemActionBuilder(metadataView) {

    var baseItemActionBuilder = null;

    var parentView = null;

    this.build = function (context, args) {
        var action = new BaseItemAction();

        var that = this;
        action.setAction(function (callback) {
            that.executeAction(args.builder, action, metadataView, callback);
        });

        parentView = args.parent;

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