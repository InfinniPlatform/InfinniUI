function AcceptActionBuilder() {
    this.build = function (builder, parent, metadata) {
        var action = new BaseAction(parent);
        action.setAction(function (callback) {
            if (callback) {
                parent.onClosed(function () {
                    callback();
                });
            }
            parent.close(dialogResult.accept);
        });

        return action;
    }
}