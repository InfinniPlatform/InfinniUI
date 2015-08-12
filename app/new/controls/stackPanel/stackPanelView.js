/**
 * @class
 * @augments ControlView
 */
var StackPanelView = ControlView.extend(
    /** @lends StackPanelView.prototype */
    {
        template: InfinniUI.Template["new/controls/stackPanel/template/stackPanel.tpl.html"],

        UI: {
            items: '.stackpanel-items'
        },

        initialize: function (options) {
            ControlView.prototype.initialize.call(this, options);
        },

        render: function () {
            this.prerenderingActions();
            this.$el.html(this.template());
            this.bindUIElements();

            this.renderItemsStrategy = new ContainerRenderStrategy(this.model, this.ui.items, StackPanelItemView);
            this.renderItemsStrategy.render();

            this.postrenderingActions();
            return this;
        }
    }
);
