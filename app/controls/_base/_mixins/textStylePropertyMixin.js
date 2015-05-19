var textStylePropertyMixin = {

    initTextStyle: function () {
        this.listenTo(this.model, 'change:textStyle', this.updateTextStyle);
    },

    updateTextStyle: function () {
        if (!this.wasRendered) {
            return;
        }
        this.switchClass('textstyle', this.model.get('textStyle'));
    }

};
