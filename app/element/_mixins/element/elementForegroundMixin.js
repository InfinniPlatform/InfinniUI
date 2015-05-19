var elementForegroundMixin = {

    getForeground: function () {
        return this.control.get('foreground');
    },

    setForeground: function (value) {
        if (InfinniUI.Metadata.ColorStyle.indexOf(value) === -1) {
            return;
        }
        this.control.set('foreground', value);
    }

};
