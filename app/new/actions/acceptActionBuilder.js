function AcceptActionBuilder() {
    this.build = function (context, args) {
        var action = new Action();
        var parentView = args.parentView;

        action.setAction(function (callback) {
            if (callback) {
                parentView.onClosed(function () {
                    callback();
                });
            }

            parentView.setDialogResult(DialogResult.accepted);
            parentView.close();
        });

        return action;
    }
}