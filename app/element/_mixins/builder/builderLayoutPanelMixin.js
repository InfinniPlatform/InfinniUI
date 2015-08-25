var builderLayoutPanelMixin = {
    registerLayoutPanel: function (params) {
        var exchange = messageBus.getExchange('global');
        exchange.send(messageTypes.onCreateLayoutPanel, {source: params.view, value: params.element});
    }
};