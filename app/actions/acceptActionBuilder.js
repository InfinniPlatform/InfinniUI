function AcceptActionBuilder() {
    this.build = function (context, args) {
        var action = new BaseAction(args.parent);
        action.setAction(function (callback) {
            if (callback) {
                args.parent.onClosed(function () {
                    callback();
                });
            }
            args.parent.close(dialogResult.accept);
        });

        return action;
    }
}