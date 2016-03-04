var TreeViewView = ListEditorBaseView.extend({

    className: 'pl-treeview',

    template: InfinniUI.Template["new/controls/treeView/template/treeview.tpl.html"],

    events: {},

    UI: _.defaults({}, ListEditorBaseView.prototype.UI),

    initialize: function (options) {
        ListEditorBaseView.prototype.initialize.call(this, options);
    },

    render: function () {
        this.prerenderingActions();

        this.renderTemplate(this.getTemplate());

        this.renderItems();
        this.updateProperties();

        this.trigger('render');

        this.postrenderingActions();
        return this;
    },

    renderItems: function (parentId) {
        var
            $nodes,
            model = this.model,
            collection = model.get('items'),
            parentSelector = model.get('parentSelector'),
            keySelector = model.get('keySelector'),
            itemTemplate = model.get('itemTemplate');

        $nodes = renderNodes();
        this.$el.append($nodes);

        function renderNodes (parentId) {
            return collection.toArray()
                .filter(function (item) {
                    var parent = parentSelector(null, {value: item});
                    return isEmpty(parentId) ? isEmpty(parent) : parent === parentId;
                })
                .map(function (item) {

                    var node = new TreeViewNode().render();
                    var $node = node.$el;

                    var $item = itemTemplate(null, {
                        value: item,
                        index: collection.indexOf(item)
                    }).render();

                    if (typeof item !== 'undefined') {
                        $item.data('pl-data-item', item);
                    }


                    node.setItemContent($item);
                    var $subitems = renderNodes(keySelector(null, {value: item}));
                    node.setItemsContent($subitems);

                    //this.addOnClickEventListener($item, item);
                    return $node;
                }/*, this*/);
        }



        function isEmpty(value) {
            return value === null || typeof value === 'undefined';
        }
    },

    getTemplate: function () {
        return this.template;
    },

    updateProperties: function () {
        ListEditorBaseView.prototype.updateProperties.call(this);
    },

    updateEnabled: function () {
        ListEditorBaseView.prototype.updateEnabled.call(this);

        var enabled = this.model.get('enabled');

    },

    updateValue: function () {

    },

    updateSelectedItem: function () {

    },

    updateGrouping: function () {
    },

    rerender: function () {

    }


});