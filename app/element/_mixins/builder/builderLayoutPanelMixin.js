var builderLayoutPanelMixin = {
    registerLayoutPanel: function (params) {
        var exchange = messageBus.getExchange('global');
        exchange.send(messageTypes.onCreateLayoutPanel, {source: params.parent, value: params.element});
    }
};