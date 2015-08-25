function CancelActionBuilder() {
    this.build = function (context, args) {
        var action = new BaseAction(args.view);
        action.setAction(function (callback) {
            if (callback) {
                args.view.onClosed(function () {
                    callback();
                });
            }
            args.view.close(dialogResult.cancel);
        });

        return action;
    }
}