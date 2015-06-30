var elementErrorTextMixin = {

    getErrorText: function () {
        return this.control.get('errorText');
    },

    setErrorText: function (value) {
        this.control.set('errorText', value);
    }

};
