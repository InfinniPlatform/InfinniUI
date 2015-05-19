var foregroundPropertyMixin = {

    initForeground: function () {
        this.listenTo(this.model, 'change:foreground', this.updateForeground);
    },

    updateForeground: function () {
        if (!this.wasRendered) {
            return;
        }
        this.switchClass('foreground', this.model.get('foreground'));
    }

};

