var labelTextPropertyMixin = {

    initLabelText: function () {
        this.listenTo(this.model, 'change:labelText', this.updateLabelText);
    },

    updateLabelText: function () {
        if (!this.wasRendered) {
            return;
        }

        this.ui.rerender();
    }

};
