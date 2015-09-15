function LinkView(parentView, viewFactory) {
    this.openMode = 'Page';
    this.parentView = parentView;
    this.viewFactory = viewFactory;
}

LinkView.prototype.setOpenMode = function (mode) {
    if (_.isEmpty(mode)) return;
    this.openMode = mode;
};

LinkView.prototype.getOpenMode = function () {
    return this.openMode;
};

LinkView.prototype.getContainer = function () {
    //return _.isEmpty(this.container) ? 'MainContainer' : this.container;
    return this.container;
};

LinkView.prototype.setContainer = function (container) {
    this.container = container;
};

LinkView.prototype.template = {
    Dialog: InfinniUI.Template["linkView/template/dialog.tpl.html"]
};

LinkView.prototype.createView = function (resultCallback) {

    var openMode = InfinniUI.global.openMode;
    var openModeStrategy = openMode.getStrategy(this);

    this.viewFactory(function (view) {
        view.onOpened(function (args) {
            view.onClosed(function () {
                args.$layout.remove();
                messageBus.getExchange('global')
                    .send(messageTypes.onViewClosed, {view: view});
            });

            openModeStrategy.open(view, args.$layout);
            //view.getExchange().send(messageTypes.onLoading, {});
        });

        resultCallback(view);
    });

};
