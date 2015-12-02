function LinkView(parentView) {
    this.openMode = 'Page';
    this.parentView = parentView;

    this.viewTemplate = function(){return '';};
}

_.extend(LinkView.prototype, {
    template: {
        Dialog: InfinniUI.Template["linkView/template/dialog.tpl.html"]
    },

    setOpenMode: function (mode) {
        if (_.isEmpty(mode)) return;
        this.openMode = mode;
    },

    getOpenMode: function () {
        return this.openMode;
    },

    getContainer: function () {
        //return _.isEmpty(this.container) ? 'MainContainer' : this.container;
        return this.container;
    },

    setContainer: function (container) {
        this.container = container;
    },

    setViewTemplate: function(viewTemplate){
        this.viewTemplate = viewTemplate;
    },

    createView: function (resultCallback) {
        var that = this;

        this.viewTemplate(onViewReady);

        function onViewReady(createdView){
            that.view = createdView;

            that._initViewHandler(createdView);
        }

        var openMode = InfinniUI.global.openMode;
        var openModeStrategy = openMode.getStrategy(this);

        this.viewFactory(function (view) {
            view.onOpened(function (args) {
                view.onClosed(function () {
                    args.$layout.remove();
                    window.InfinniUI.global.messageBus
                        .send(messageTypes.onViewClosed, {view: view});
                });

                openModeStrategy.open(view, args.$layout);
                //view.getExchange().send(messageTypes.onLoading, {});
            });

            resultCallback(view);
        });

    },

    _initViewHandler: function(view){
        var that = this;

        view.onOpened(function (args) {

            var openMode = that.openMode;
            var openMode = that.openMode;

            switch(openMode){
                case 'Page': {

                } break;
            }

            //view.onClosed(function () {
            //    args.$layout.remove();
            //    window.InfinniUI.global.messageBus
            //        .send(messageTypes.onViewClosed, {view: view});
            //});

             openModeStrategy.open(view, args.$layout);
        });
    }
});
