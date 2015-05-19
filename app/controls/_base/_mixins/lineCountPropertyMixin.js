var lineCountPropertyMixin = {

    updateLineCount: function () {
        if (!this.wasRendered) {
            return;
        }

        var lineCount = this.model.get('lineCount');

        if (lineCount > 0) {
            this.switchClass('line-count',  lineCount, this.ui.container);
            //this.ui.container.removeAttr('class');
            //this.ui.container.addClass('line-count-' + lineCount);
        }
    },

    initUpdateLineCount: function () {
        this.listenTo(this.model, 'change:lineCount', this.updateLineCount);
    }

};
