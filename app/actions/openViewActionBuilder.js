function OpenViewActionBuilder() {
    this.build = function (context, args){
        var action = new BaseAction(args.view);
        action.setAction(function (callback) {
            args.builder.build(args.metadata.View, {parentView: args.parentView}).createView(function (view) {
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