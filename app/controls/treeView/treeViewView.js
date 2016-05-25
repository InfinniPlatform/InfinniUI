var TreeViewView = ListEditorBaseView.extend({

    className: 'pl-treeview',
    classNameMultiSelect: 'pl-treeview_multi-select',
    classNameSingleSelect: 'pl-treeview_single-select',

    template: InfinniUI.Template["controls/treeView/template/treeview.tpl.html"],

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
            view = this,
            $nodes,
            model = this.model,
            collection = model.get('items'),
            parentSelector = model.get('parentSelector'),
            keySelector = model.get('keySelector'),
            nodeConstructor = this.getNodeConstructor(),
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
                    var node = new nodeConstructor().render();
                    var $node = node.$el;
                    var $item = itemTemplate(null, {
                        value: item,
                        index: collection.indexOf(item)
                    }).render();

                    node.listenTo(model, 'change:selectedItem', function (model, selectedItem) {
                        node.setSelected(selectedItem === item);
                    });

                    node.listenTo(model, 'change:value', function (model, value) {
                        var multiSelect = model.get('multiSelect');

                        var checked;
                        if (!multiSelect) {
                            checked = isValueForItem(value);
                        } else if (Array.isArray(value)) {
                            checked = value.some(isValueForItem)
                        } else {
                            checked = false;
                        }
                        node.setChecked(checked);
                    });

                    view.listenTo(node, 'select', view.onSelectNodeHandler.bind(view, item, node));
                    view.listenTo(node, 'check', view.onCheckNodeHandler.bind(view, item, node));

                    node.setItemContent($item);
                    var $subitems = renderNodes(keySelector(null, {value: item}));
                    node.setItemsContent($subitems);

                    return $node;

                    function isValueForItem(value) {
                        return model.itemByValue(value) === item;
                    }
                });
        }

        function isEmpty(value) {
            return value === null || typeof value === 'undefined';
        }
    },

    getNodeConstructor: function () {
        var multiSelect = this.model.get('multiSelect');

        return (multiSelect === true) ? TreeViewNodeCheckbox : TreeViewNodeRadio;
    },

    onSelectNodeHandler: function(item , index) {
        var model = this.model;

        var multiSelect = model.get('multiSelect');

        model.set('selectedItem', item);
        if (!multiSelect) {
            //Клик по элементу одновременно переключает значение и делает элемент выделенным
            var value = model.valueByItem(item);
            model.toggleValue(value);
        }
    },

    onCheckNodeHandler: function (item, index) {
        var model = this.model;

        var multiSelect = model.get('multiSelect');

        var value = model.valueByItem(item);
        model.toggleValue(value);

        if (!multiSelect) {
            //Клик по элементу одновременно переключает значение и делает элемент выделенным
            model.set('selectedItem', item);
        }
    },

    getTemplate: function () {
        return this.template;
    },

    updateProperties: function () {
        ListEditorBaseView.prototype.updateProperties.call(this);
        this.updateMultiSelect();
    },

    updateMultiSelect: function () {
        var multiSelect = this.model.get('multiSelect');
        this.$el.toggleClass(this.classNameMultiSelect, !!multiSelect);
        this.$el.toggleClass(this.classNameSingleSelect, !multiSelect);
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

    updateDisabledItem: function(){

    },

    rerender: function () {

    }

});