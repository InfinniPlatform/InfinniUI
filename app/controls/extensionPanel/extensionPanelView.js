var ExtensionPanelView = ControlView.extend({
    className: 'pl-extension-panel',

    initialize: function () {
        ControlView.prototype.initialize.apply(this);
        this.extensionObject = null;
    },

    render: function () {
        this.prerenderingActions();

        if (!this.extensionObject) {
            this.initAndRenderExtensionObject();
        } else {
            this.renderExtensionObject();
        }

        this.postrenderingActions();
        return this;
    },

    initAndRenderExtensionObject: function () {
        var extensionName = this.model.get('extensionName'),
            context = this.model.get('context'),
            parameters = this.model.get('parameters');

        this.extensionObject = new window[extensionName]();
        var self = this;
        var $render = self.extensionObject.render(self.$el, parameters, context);
        self.$el.html($render);
    },

    renderExtensionObject: function () {
        var $render = this.extensionObject.render(this.$el, this.model.get('parent'));
        this.$el.html($render);
    }
});