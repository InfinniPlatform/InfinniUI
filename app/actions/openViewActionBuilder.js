function OpenViewActionBuilder() {
    this.build = function (builder, parent, metadata) {
        var action = new BaseAction(parent);
        action.setAction(function (callback) {
            builder.build(parent, metadata.View).createView(function (view) {
                if (callback) {
                    view.onLoaded(function () {
                        callback();
                    });
                }

                view.open();
            });
        });

        return action;
    }
}