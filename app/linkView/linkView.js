function LinkView(parentView) {
    this.openMode = 'Page';
    this.parentView = parentView;

    this.viewTemplate = function(){return '';};
}

_.extend(LinkView.prototype, {

    setOpenMode: function (mode) {
        if (_.isEmpty(mode)) return;
        this.openMode = mode;
    },

    getOpenMode: function () {
        return this.openMode;
    },

    setContainer: function(containerName){
        this.containerName = containerName;
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

            resultCallback(createdView);
        }

    },

    _initViewHandler: function(view){
        var that = this;
        var openMode = that.openMode;
        var context = this.parentView.getContext();
        var openStrategy;
        var container;

        switch(openMode){
            case 'Container': {
                container = context.controls[this.containerName];

                openStrategy = new OpenModeContainerStrategy();
                openStrategy.setView(view);
                openStrategy.setContainer(container);
                view.setOpenStrategy(openStrategy);
            } break;

            case 'Dialog': {
                openStrategy = new OpenModeDialogStrategy();
                openStrategy.setView(view);
                view.setOpenStrategy(openStrategy);
            } break;
        }

        view.open();
    }
});
