var hintTextPropertyMixin = {

    initHintText: function () {
        this.listenTo(this.model, 'change:hintText', this.updateHintText);
    },

    updateHintText: function () {
        if (!this.wasRendered) {
            return;
        }

        var text = this.model.get('hintText');
        if (typeof text === 'undefined' || text === null) {
            text = '';
        }
        this.ui.hintText.text(text);
    }

};

