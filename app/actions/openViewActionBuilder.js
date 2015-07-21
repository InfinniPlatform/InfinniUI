function OpenViewActionBuilder() {
    this.build = function (context, args){
        var action = new BaseAction(args.parent);
        action.setAction(function (callback) {
            args.builder.build(args.parent, args.metadata.View).createView(function (view) {
                if (callback) {
                    view.onLoaded(function () {
                        callback(view);
                    });
                }

                view.open();
            });
        });

        return action;
    }
}