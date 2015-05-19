var elementHintTextMixin = {

    getHintText: function () {
        return this.control.get('hintText');
    },

    setHintText: function (value) {
        var text = typeof value === 'undefined' || value === null ? '' : value;
        this.control.set('hintText', text);
    }

};
