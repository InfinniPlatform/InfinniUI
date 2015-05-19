var backgroundPropertyMixin = {

    initBackground: function () {
        this.listenTo(this.model, 'change:background', this.updateBackground);
    },

    updateBackground: function () {
        if (!this.wasRendered) {
            return;
        }
        this.switchClass('background', this.model.get('background'));
    }

};

