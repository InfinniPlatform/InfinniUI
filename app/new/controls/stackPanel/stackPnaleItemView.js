var StackPanelItemView = Backbone.View.extend(
    /** @lends StackPanelItemView.prototype */
    {
        template: InfinniUI.Template["new/controls/stackPanel/template/stackPanelItem.tpl.html"],

        className: 'stackpanel_itemtemplate',

        UI: {
            content: '.stackpanel-item-content'
        },

        initialize: function (options) {
            this.options = options;
            this.listenTo(this.model, 'change:orientation', this.onChangeOrientationHandler, this);
        },

        render: function () {
            var
                model = this.model,
                itemTemplate = model.get('itemTemplate'),
                itemsCollection = model.get('items'),
                item = this.options.item,
                $item = itemTemplate(undefined, {
                    item: item,
                    index: itemsCollection.indexOf(item)
                }).render();

            this.$el.html(this.template({}));
            this.bindUIElements();
            this.ui.content.append($item);
            return this;
        },

        onChangeOrientationHandler: function () {

        }

    }
);

_.extend(StackPanelItemView.prototype, bindUIElementsMixin);