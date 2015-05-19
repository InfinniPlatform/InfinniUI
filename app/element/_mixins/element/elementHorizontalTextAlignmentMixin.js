var elementHorizontalTextAlignmentMixin = {

    getHorizontalTextAlignment: function () {
        return this.control.get('horizontalTextAlignment');
    },

    setHorizontalTextAlignment: function (value) {
        if (InfinniUI.Metadata.HorizontalTextAlignment.indexOf(value) === -1) {
            return;
        }
        this.control.set('horizontalTextAlignment', value);
    }

};