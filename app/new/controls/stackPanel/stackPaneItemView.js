var StackPanelItemView = Backbone.View.extend(
    /** @lends StackPanelItemView.prototype */
    {
        tagName: 'li',
        className: 'pl-stack-panel-i',
        template: InfinniUI.Template["new/controls/stackPanel/template/stackPanelItem.tpl.html"],

        UI: {
            content: '.stackpanel-item-content'
        },

        initialize: function (options) {
            this.options = options;
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
            this.$el.prepend($item);
            return this;
        }

    }
);

_.extend(StackPanelItemView.prototype, bindUIElementsMixin);