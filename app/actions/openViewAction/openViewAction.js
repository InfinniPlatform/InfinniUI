function OpenViewAction(parentView){
    _.superClass(OpenViewAction, this, parentView);
}

_.inherit(OpenViewAction, BaseAction);


_.extend(OpenViewAction.prototype, {
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