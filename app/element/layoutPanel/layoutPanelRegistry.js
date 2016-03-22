var LayoutPanelRegistry = function () {

    var items = [];

    var exchange = window.InfinniUI.global.messageBus;

    /**
     *
     * @param message.source {View}
     * @param message.value {LayoutPanel}
     */
    var addLayoutPanel = function (message) {
        console.log('addLayoutPanel', message);
        var matched = false;
        for (var i = 0, ln = items.length; i < ln; i = i + 1) {
            if (items[i].layoutPanel === message.value) {
                matched = true;
                break;
            }
        }
        if (!matched) {
            items.push({view: message.source, layoutPanel: message.value});
        }

    };

    /**
     *
     * @param message.source {View}
     * @param message.value {LayoutPanel}
     */
    var removeLayoutPanel = function (message) {
        console.log('removeLayoutPanel', message);
        var view = message.source;
        var layoutPanel = message.value;

        var filterByLayoutPanel = function (item) {
            return item.layoutPanel !== layoutPanel;
        };

        var filterByView = function (item) {
            return item.view !== view;
        };

        var _items = items.filter(_.isEmpty(layoutPanel) ? filterByView : filterByLayoutPanel);

        items = _items;
    };

    var removeView = function (message) {
        removeLayoutPanel({source: message.view});
    };

    exchange.subscribe(messageTypes.onCreateLayoutPanel, addLayoutPanel);

    exchange.subscribe(messageTypes.onRemoveLayoutPanel, removeLayoutPanel);

    exchange.subscribe(messageTypes.onViewClosed, removeView);

    this.debug = function () {
        console.table(items);
    };

    this.getLayoutPanel = function (name) {
        var item = _.find(items, function (item) {
            var layoutPanel = item.layoutPanel;
            if (layoutPanel.getName() === name) {
                return true;
            }
        });

        return typeof item === 'undefined' ? item : item.layoutPanel;
    }

};


window.layoutPanelRegistry = new LayoutPanelRegistry();