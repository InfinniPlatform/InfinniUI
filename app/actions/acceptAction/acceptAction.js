function AcceptAction(parentView){
    _.superClass(AcceptAction, this, parentView);
}

_.inherit(AcceptAction, BaseAction);


_.extend(AcceptAction.prototype, {
    execute: function(callback){
        if (callback) {
            this.parentView.onClosed(function () {
                callback();
            });
        }

        this.parentView.setDialogResult(DialogResult.accepted);
        this.parentView.close();
    }
});