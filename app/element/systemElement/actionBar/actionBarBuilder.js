function ActionBarBuilder() {

}

_.inherit(ActionBarBuilder, ElementBuilder);

_.extend(ActionBarBuilder.prototype, {

    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);


        //var applicationView = params.parent.getApplicationView();
        //params.element.setApplicationView(applicationView);


        var exchange = messageBus.getExchange('global');

        exchange.subscribe(messageTypes.onViewOpened, this.onViewOpened.bind(this, params));

        exchange.subscribe(messageTypes.onViewClosed, this.onViewClosed.bind(this, params));

    },

    createElement: function (params) {
        return new ActionBar(params.parent);
    },

    onViewOpened: function (params, message) {
        var applicationView = params.parent.getApplicationView();
        if (message.openMode === 'Page' && applicationView === message.view.getApplicationView()) {
            //Открывается страница текущего приложения
            console.log('ActionBar.onViewOpened', message);
            //console.log(InfinniUI.global.openMode.getPageViews(message.view.getApplicationView()));
            this.updatePages(params);
        }
    },

    updatePages: function (params) {
        var applicationView = params.parent.getApplicationView();
        var pageViews = InfinniUI.global.openMode.getPageViews(applicationView);
        params.element.setPages(pageViews.slice());
    },

    onViewClosed: function (params, message) {
        var applicationView = params.parent.getApplicationView();
        if (applicationView === message.view.getApplicationView()) {
            //Закрыта страница текущего приложения
            console.log('ActionBar.onViewClosed', message);
            this.updatePages(params);
        }
    }

});