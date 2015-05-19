var elementBackgroundMixin = {

    getBackground: function () {
        return this.control.get('background');
    },

    setBackground: function (value) {
        if (InfinniUI.Metadata.ColorStyle.indexOf(value) === -1) {
            return;
        }
        this.control.set('background', value);
    }

};