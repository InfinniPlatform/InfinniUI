var TreeViewNode = Backbone.View.extend({

    template: InfinniUI.Template["new/controls/treeView/template/node.tpl.html"],

    className: 'pl-treeview-node',

    UI: {
        item: '.pl-treeview-node-item',
        container: '.pl-treeview-node-container',
        items: '.pl-treeview-node-items'
    },

    events: {
        "click .pl-treeview-node-container": 'onClickEventHandler'
    },

    render: function () {
        this.$el.html(this.template);
        this.toggle();
        this.bindUIElements();

        return this;
    },

    toggle: function () {
        this.$el.toggleClass('pl-treeview-bode_collapsed');
    },

    setItemContent: function ($itemContent) {
        this.ui.item.empty();
        this.ui.item.append($itemContent);
    },

    setItemsContent: function ($itemsContent) {
        this.ui.items.empty();
        this.ui.items.append($itemsContent);
    },

    onClickEventHandler: function (event) {
        if (event.currentTarget !== this.ui.container[0]) {
            return;
        }
        this.toggle();
    }
});

_.extend(TreeViewNode.prototype, bindUIElementsMixin);