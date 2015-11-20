var builderLayoutPanelMixin = {
    registerLayoutPanel: function (params) {
        var exchange = window.InfinniUI.global.messageBus;
        exchange.send(messageTypes.onCreateLayoutPanel, {source: params.view, value: params.element});
    }
};