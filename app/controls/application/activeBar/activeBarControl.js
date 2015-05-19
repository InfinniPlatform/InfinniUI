var ActiveBarControl = function (appId, view, viewId) {
    this.appId = appId;
    this.appName = view.getText();
    this.viewId = viewId;
    this.view = view;

    _.superClass(ActiveBarControl, this);
};
_.inherit(ActiveBarControl, Control);
_.extend(ActiveBarControl.prototype, {
    createControlModel: function () {
        return new ActiveBarModel({appId: this.appId, appName: this.appName, viewId: this.viewId, view: this.view});
    },
    createControlView: function (model) {
        return new ActiveBarView({model: model});
    },

    /**
     * @description Закрытие дочерних представлений приложения
     * @param {Function} callback
     */
    closingViews: function (callback) {
        this.controlView.requestClose(callback);
        //var views = this.controlModel.get('views');
        //this.controlView.onClosedAllViews = callback;
        //if (views.length > 0) {
        //    var exchange = messageBus.getExchange(this.appId);
        //    // Рассылка всем представлениям из ActiveBar запроса на закрытие
        //    views.each(function (data) {
        //        exchange.send(messageTypes.onViewClosing, {viewId: data.get('viewId'), appId: this.appId});
        //    });
        //} else {
        //    //Нет открытых дочерних представлений
        //    callback();
        //}
    },

    remove: function () {
        this.controlView.remove();
    }

});