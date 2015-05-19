var TabPageView = ControlView.extend({

    className: 'pl-tab-page tab-pane',

    initialize: function () {
        ControlView.prototype.initialize.apply(this);
        this.listenTo(this.model, 'change:layoutPanel', this.onChangeLayoutPanelHandler);
    },

    render: function () {
        var layoutPanel = this.model.get('layoutPanel');
        this.prerenderingActions();
        this.$el.empty();

        if (typeof layoutPanel !== 'undefined') {
            this.$el.append(layoutPanel.render());
        }

        this.postrenderingActions();
        return this;
    },

    /**
     * @private
     */
    onChangeLayoutPanelHandler: function () {
        this.rerender();
    }

});