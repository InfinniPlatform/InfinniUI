var GlobalNavigationPopup = Backbone.View.extend({

    tagName: 'ul',

    className: 'pl-gn-list',

    template: {
        item: InfinniUI.Template['controls/application/globalNavigationBar/template/item.tpl.html']
    },

    UI: {
        items: '.items'
    },

    events: {
        'click .pl-application-item': 'onItemClickHandler',
        'click .pl-application-close': 'onCloseClickHandler',
        'mouseleave': 'onMouseOutHandler'
    },

    /**
     * @param {*} options
     * @param {GlobalNavigationBarApplicationCollection} options.collection
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
                    name: view.getText(),
                    appId: model.get('appId')
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
        var appId = $el.attr('data-app-id');
        var application = this.collection.findWhere({appId: appId});
        application.trigger('application:active', application);
    },

    onCloseClickHandler: function (event) {
        event.preventDefault();
        event.stopPropagation();
        var $el = $(event.target);
        var appId = $el.attr('data-app-id');
        var application = this.collection.findWhere({appId: appId});
        application.trigger('application:close', application);
    },

    onMouseOutHandler: function () {
        this.$el.parent().addClass('hidden');
    }

});