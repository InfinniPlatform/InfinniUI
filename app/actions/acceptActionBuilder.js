function AcceptActionBuilder() {
    this.build = function (context, args) {
        var action = new BaseAction(args.view);
        action.setAction(function (callback) {
            if (callback) {
                args.view.onClosed(function () {
                    callback();
                });
            }
            args.view.close(dialogResult.accept);
        });

        return action;
    }
}