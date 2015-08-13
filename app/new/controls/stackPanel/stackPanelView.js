/**
 * @class
 * @augments ControlView
 */
var StackPanelView = ControlView.extend(
    /** @lends StackPanelView.prototype */
    {
        tagName: 'ul',
        className: 'pl-stack-panel',

        //template: InfinniUI.Template["new/controls/stackPanel/template/stackPanel.tpl.html"],

        UI: {
            items: '.stackpanel-items'
        },

        initialize: function (options) {
            ControlView.prototype.initialize.call(this, options);
            this.initOrientation();
        },

        render: function () {
            this.prerenderingActions();
            this.$el.empty();
            //this.$el.html(this.template());
            this.bindUIElements();

            this.updateOrientation();

            this.renderItemsStrategy = new ContainerRenderStrategy(this.model, this.$el, StackPanelItemView);
            this.renderItemsStrategy.render();

            this.postrenderingActions();
            return this;
        },

        initOrientation: function () {
            this.listenTo(this.model, 'change:orientation', this.updateOrientation);
            this.updateOrientation();
        },

        updateOrientation: function () {
            var orientation = this.model.get('orientation');
            this.$el.toggleClass('horizontal-orientation', orientation == 'Horizontal');
        }
    }
);
