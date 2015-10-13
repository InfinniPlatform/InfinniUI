function CancelActionBuilder() {
    this.build = function (context, args) {
        var action = new Action();
        var parentView = args.parentView;

        action.setAction(function (callback) {
            if (callback) {
                parentView.onClosed(function () {
                    callback();
                });
            }

            parentView.setDialogResult(DialogResult.canceled);
            parentView.close();
        });

        return action;
    }
}