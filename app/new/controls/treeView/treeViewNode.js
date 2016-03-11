var TreeViewNode = Backbone.View.extend({

    template: InfinniUI.Template["new/controls/treeView/template/node.tpl.html"],

    className: 'pl-treeview-node',

    classNameChecked: 'pl-treeview-node_checked',

    classNameSelected: 'pl-treeview-node_selected',

    classNameCollapsed: 'pl-treeview-node_collapsed',

    UI: {
        itemContent: '.pl-treeview-node-item__content',
        itemCheck: '.pl-treeview-node-item__check',
        container: '.pl-treeview-node-container',
        button: '.pl-treeview-node-button',
        items: '.pl-treeview-node-items'
    },

    initialize: function () {
        var model = new Backbone.Model();
        this.model = model;
        this.listenTo(model, 'change:selected', this.updateSelected);
        this.listenTo(model, 'change:checked', this.updateChecked);
    },

    updateChecked: function () {
        var checked = this.model.get('checked');
        this.$el.toggleClass(this.classNameChecked, checked === true);
    },

    updateSelected: function () {
        var selected = this.model.get('selected');
        this.$el.toggleClass(this.classNameSelected, selected === true);
    },

    updateState: function () {
        this.updateSelected();
        this.updateChecked();
    },

    render: function () {
        this.$el.html(this.template);
        this.toggle();
        this.bindUIElements();
        this.updateState();
        this.initDomEventsHandlers();
        return this;
    },

    initDomEventsHandlers: function () {
        this.ui.button.on('click', this.onClickEventHandler.bind(this));
        this.ui.itemContent[0].addEventListener('click', this.onClickItemHandler.bind(this), true);
        this.ui.itemCheck[0].addEventListener('click', this.onClickCheckHandler.bind(this), true);
    },

    onClickItemHandler: function (event) {
        this.trigger('select');
    },

    onClickCheckHandler: function (event) {
        this.trigger('check');
    },

    toggle: function () {
        this.$el.toggleClass(this.classNameCollapsed);
    },

    setItemContent: function ($itemContent) {
        this.ui.itemContent.empty();
        this.ui.itemContent.append($itemContent);
    },

    setItemsContent: function ($itemsContent) {
        this.ui.items.empty();
        this.ui.items.append($itemsContent);
    },

    onClickEventHandler: function (event) {
        this.toggle();
    },

    setSelected: function (selected) {
        this.model.set('selected', selected);
    },

    setChecked: function (checked) {
        this.model.set('checked', checked);
    }
});

_.extend(TreeViewNode.prototype, bindUIElementsMixin);