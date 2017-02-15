var TreeViewView = ListEditorBaseView.extend({

    className: 'pl-treeview',
    classNameMultiSelect: 'pl-treeview_multi-select',
    classNameSingleSelect: 'pl-treeview_single-select',

    template: InfinniUI.Template["controls/treeView/template/treeview.tpl.html"],

    events: {},

    UI: _.defaults({}, ListEditorBaseView.prototype.UI),

    initialize: function (options) {
        ListEditorBaseView.prototype.initialize.call(this, options);
        this.ItemsMap = new HashMap();

    },

    render: function () {
        this.prerenderingActions();

        this.renderTemplate(this.getTemplate());

        this.renderItems();
        this.updateProperties();

        this.trigger('render');

        this.postrenderingActions();
        //devblockstart
        window.InfinniUI.global.messageBus.send('render', {element: this});
        //devblockstop
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
            itemTemplate = model.get('itemTemplate'),
            itemsMap = this.ItemsMap;

        itemsMap.clear();

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

                    $node.data('pl-data-item', item);

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
                    var key = keySelector(null, {value: item}),
                        $subitems = renderNodes(key);
                    node.setItemsContent($subitems);

                    itemsMap.add(key, item);

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
            this.tryToggleValue(item);
        }
    },

    onCheckNodeHandler: function (item, index) {
        var model = this.model;

        var multiSelect = model.get('multiSelect');

        this.tryToggleValue(item);

        if (!multiSelect) {
            //Клик по элементу одновременно переключает значение и делает элемент выделенным
            model.set('selectedItem', item);
        }
    },

    tryToggleValue: function(item){
        var model = this.model;
        var isDisabledItem = this.isDisabledItem(item);

        if(!isDisabledItem){
            var value = model.valueByItem(item);
            model.toggleValue(value);
        }
    },

    isDisabledItem: function(item){
        if(item == null){
            return false;
        }

       return this.model.isDisabledItem(item) || this.isDisabledItem(this.getParent(item));
    },

    getParent: function(item){
        var parentSelector = this.model.get('parentSelector'),
            parentId = parentSelector(null, {value: item});

        return parentId && this.ItemsMap.get(parentId);
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

    updateDisabledItem: function() {
        var model = this.model;
        var disabledItemCondition = model.get('disabledItemCondition');
        var nodes = this.$el.find('.pl-treeview-node');

        nodes.removeClass('pl-disabled-list-item');

        if( disabledItemCondition != null){
            nodes.each(function(i, el){
                var $el = $(el),
                    item = $el.data('pl-data-item');

                if(model.isDisabledItem(item)){
                    $el.addClass('pl-disabled-list-item');
                }
            });
        }
    }


});
