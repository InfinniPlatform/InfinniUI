var AjaxLoaderIndicatorModel = Backbone.Model.extend({

    defaults: {
        requests: 0,
        progress: false
    },

    initialize: function (attributes, options) {
        var exchange = window.InfinniUI.global.messageBus;

        exchange.subscribe(messageTypes.onDataLoaded, this.onDataLoaded.bind(this));
        exchange.subscribe(messageTypes.onDataLoading, this.onDataLoading.bind(this));

        var onRequestsChanged = (options.delay > 0) ? _.debounce(this.onRequestsChanged.bind(this), 50) :
            this.onRequestsChanged.bind(this);

        this.on('change:requests', onRequestsChanged);
    },

    onDataLoading: function () {
        var requests = this.get('requests');
        this.set('requests', requests + 1);
    },

    onDataLoaded: function () {
        var requests = this.get('requests');
        this.set('requests', requests - 1);
    },

    onRequestsChanged: function (model, value) {
        this.set('progress', value > 0);
    }

});