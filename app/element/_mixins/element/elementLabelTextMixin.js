var elementLabelTextMixin = {

    getLabelText: function () {
        return this.control.get('labelText');
    },

    setLabelText: function (value) {
        this.control.set('labelText', value);
    }
};
