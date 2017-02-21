var TreeViewNodeBase = Backbone.View.extend({

    className: 'pl-treeview-node',

    classNameCheckerChecked: 'pl-treeview-item__checker_checked',
    classNameCheckerUnchecked: 'pl-treeview-item__checker_unchecked',
    classNameContentSelected: 'pl-treeview-item__content_selected',
    classNameItemsExpanded: 'pl-treeview-node__items_expanded',
    classNameItemsCollapsed: 'pl-treeview-node__items_collapsed',
    classNameButtonCollapse: 'pl-treeview-node__button_collapse',
    classNameButtonExpand: 'pl-treeview-node__button_expand',
    classNameButtonNone: 'pl-treeview-node__button_none',
    classNameIsLeaf: 'pl-treeview-node_is-leaf',

    UI: {
        checker: '.pl-treeview-item__checker',
        content: '.pl-treeview-item__content',
        items: '.pl-treeview-node__items',
        button: '.pl-treeview-node__button'
    },

    initialize: function () {
        var model = new Backbone.Model({collapsed: true, isLeaf: true});
        this.model = model;
        this.listenTo(model, 'change:selected', this.updateSelected);
        this.listenTo(model, 'change:checked', this.updateChecked);
        this.listenTo(model, 'change:collapsed', this.updateCollapsed);
        this.listenTo(model, 'change:isLeaf', this.updateCollapsed);
    },

    updateChecked: function () {
        var checked = this.model.get('checked');
        this.ui.checker.toggleClass(this.classNameCheckerChecked, checked === true);
        this.ui.checker.toggleClass(this.classNameCheckerUnchecked, checked !== true);
    },

    updateSelected: function () {
        var selected = this.model.get('selected');
        this.ui.content.toggleClass(this.classNameContentSelected, selected === true);
    },

    updateCollapsed: function () {
        var isLeaf = this.model.get('isLeaf');
        var collapsed = !!this.model.get('collapsed');
        this.ui.items.toggleClass(this.classNameItemsExpanded, !collapsed && !isLeaf);
        this.ui.items.toggleClass(this.classNameItemsCollapsed, collapsed && !isLeaf);
        this.ui.button.toggleClass(this.classNameButtonCollapse, !collapsed && !isLeaf);
        this.ui.button.toggleClass(this.classNameButtonExpand, collapsed && !isLeaf);

        this.$el.toggleClass(this.classNameIsLeaf, isLeaf);
        this.ui.button.toggleClass(this.classNameButtonNone, isLeaf);
    },

    updateState: function () {
        this.updateCollapsed();
        this.updateSelected();
        this.updateChecked();
    },

    render: function () {
        this.$el.html(this.template);
        this.bindUIElements();
        this.updateState();
        this.initDomEventsHandlers();
        return this;
    },

    initDomEventsHandlers: function () {
        this.ui.button.on('click', this.onClickEventHandler.bind(this));
        this.ui.content[0].addEventListener('click', this.onClickItemHandler.bind(this), true);
        this.ui.checker[0].addEventListener('click', this.onClickCheckHandler.bind(this), true);
    },

    onClickItemHandler: function (event) {
        this.trigger('select');
    },

    onClickCheckHandler: function (event) {
        this.trigger('check');
    },

    toggle: function () {
        var model = this.model;
        var collapsed = model.get('collapsed');

        this.model.set('collapsed', !collapsed);
    },

    expand: function () {
        this.model.set('collapsed', false);
    },

    collapse: function(  ) {
        this.model.set('collapsed', true);
    },

    getCollapsed: function(  ) {
        return this.model.get('collapsed');
    },

    setItemContent: function ($itemContent) {
        this.ui.content.empty();
        this.ui.content.append($itemContent);
    },

    setItemsContent: function ($itemsContent) {
        this.ui.items.empty();
        this.model.set('isLeaf', !$itemsContent.length);
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

_.extend(TreeViewNodeBase.prototype, bindUIElementsMixin);