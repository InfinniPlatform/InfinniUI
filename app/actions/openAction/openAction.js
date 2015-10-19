function OpenAction(parentView){
    _.superClass(OpenAction, this, parentView);
}

_.inherit(OpenAction, BaseAction);


_.extend(OpenAction.prototype, {
    execute: function(callback){
        var linkView = this.getProperty('linkView');

        linkView.createView(function (view) {
            if (callback) {
                view.onLoaded(function () {
                    callback(view);
                });
            }

            view.open();
        });
    }
});