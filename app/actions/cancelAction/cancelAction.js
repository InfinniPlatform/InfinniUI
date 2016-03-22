function CancelAction(parentView){
    _.superClass(CancelAction, this, parentView);
}

_.inherit(CancelAction, BaseAction);


_.extend(CancelAction.prototype, {
    execute: function(callback){
        if (callback) {
            this.parentView.onClosed(function () {
                callback();
            });
        }

        this.parentView.setDialogResult(DialogResult.canceled);
        this.parentView.close();
    }
});