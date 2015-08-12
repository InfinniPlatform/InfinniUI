/**
 * @class
 * @augments ControlView
 */
var StackPanelView = ControlView.extend(
    /** lends StackPanelView.prototype */
    {
        template: InfinniUI.Template["new/controls/stackPanel/template/stackPanel.tpl.html"],

        initialize: function (options) {
            ControlView.initialize.call(this, options);

            var itemsCollection = this.model.get('items');
            itemsCollection.onChange(this.onChangeItemsHandler.bind(this));
        },

        render: function () {
            this.prerenderingActions();
            this.$el.html(this.template());
            this.bindUIElements();
            this.renderItems();
            this.postrenderingActions();
            return this;
        },

        renderItems: function () {

        },

        onChangeItemsHandler: function () {
            this.renderItems();
        }
    }
);
