var elementTextStyleMixin = {

    getTextStyle: function () {
        return this.control.get('textStyle');
    },

    setTextStyle: function (value) {
        if (InfinniUI.Metadata.TextStyle.indexOf(value) === -1) {
            return;
        }
        this.control.set('textStyle', value);
    }

};