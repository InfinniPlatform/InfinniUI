var ListBoxView = ControlView.extend({
    className: 'pl-listbox',

    template: InfinniUI.Template['element/dataElement/listBox3/controls/template/listBox.tpl.html'],

    events: {},

    itemView: {
        radio: ListBoxRadioItem,
        check: ListBoxCheckItem
    },

    createItemView: function (data) {
        var name = this.model.get('multiSelect') ? 'check' : 'radio';
        return new this.itemView[name](data);
    },

    UI: {
        container: '.listbox-body'
    },

    initialize: function () {
        ControlView.prototype.initialize.apply(this);
        this.once('render', this.initUIHandler);
        this.listenTo(this.model, 'check', function (index) {

        })
    },

    render: function () {
        this.prerenderingActions();
        this.$el.html(this.template());
        this.bindUIElements();
        this.trigger('render');
        this.renderItems();
        this.postrenderingActions();
        return this;
    },

    initUIHandler: function () {
        this.listenTo(this.model, 'change:multiSelect', function () {
            this.renderItems();
        });

        this.listenTo(this.model, 'change:items', function () {
            this.renderItems();
        });
    },

    renderItems: function () {
        var
            model = this.model,
            items = model.get('items'),
            itemTemplate = model.get('itemTemplate'),
            view = this,
            $items;

        if (Array.isArray(this.$items)) {
            this.$items.forEach(function ($item) {
                view.stopListening($item);
                $item.remove();
            });
        }

        if (Array.isArray(items)) {
            $items = items.map(function(item, index) {
                var content = itemTemplate(item, index);
                var itemView = view.createItemView({
                    content: content, 
                    index: index,
                    model: model
                });

                view.listenTo(itemView, 'toggle',  view.onToggleItemHandler);

                return itemView.render().$el;
            });

            this.$items = $items;
            this.ui.container.append($items);
        }
    },


    onToggleItemHandler: function (index) {

    }


});
