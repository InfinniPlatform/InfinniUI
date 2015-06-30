var textWrappingPropertyMixin = {

    initTextWrapping: function () {
        this.listenTo(this.model, 'change:textWrapping', this.updateLinkText);
    },

    updateTextWrapping: function () {
        var textWrapping = this.model.get('textWrapping');
        this.$el.toggleClass('TextWrapping', textWrapping);
        this.$el.toggleClass('NoTextWrapping', !textWrapping);
    }
};