var ActiveBarPopup = Backbone.View.extend({

    tagName: 'ul',

    className: 'navbar-list-items',

    template: {
        item: InfinniUI.Template['controls/application/activeBar/template/item.tpl.html']
    },

    UI: {
        items: '.items'
    },

    events: {
        'click .navbar-list-item': 'onItemClickHandler',
        'click .navbar-list-item-close': 'onCloseClickHandler',
        'mouseleave': 'onMouseOutHandler'
    },

    /**
     * @param {*} options
     * @param {ActiveBarTabsCollection} options.collection
     */
    initialize: function (options) {
        var collection = options.collection;

        this.listenTo(collection, 'add', this.onChangeHandler);
        this.listenTo(collection, 'remove', this.onChangeHandler);
        this.listenTo(collection, 'onTextChange', this.onChangeHandler);

        this.collection = collection;
    },

    onChangeHandler: function (model, collection) {
        this.renderItems();
    },

    renderItems: function () {
        var collection = this.collection;
        var template = this.template.item;
        var $items = this.$el;
        $items.empty();

        collection.forEach(function (model) {
            if (model.get('home') !== true) {
                var view = model.get('view');
                $items.append(template({
                    viewId: model.get('viewId'),
                    title: view.getText()
                }));
            }
        }, this);
    },

    render: function () {
        this.$el.empty();
        this.renderItems();
        return this;
    },

    onItemClickHandler: function (event) {
        event.preventDefault();
        var $el = $(event.target);
        var viewId = $el.attr('data-view-id');
        var view = this.collection.findWhere({viewId: viewId});
        view.trigger('view:active', view);
    },

    onCloseClickHandler: function (event) {
        event.preventDefault();
        event.stopPropagation();
        var $el = $(event.target);
        var viewId = $el.attr('data-view-id');
        var view = this.collection.findWhere({viewId: viewId});
        view.trigger('view:close', view);
    },

    onMouseOutHandler: function () {
        this.$el.parent().addClass('hidden');
    }

});