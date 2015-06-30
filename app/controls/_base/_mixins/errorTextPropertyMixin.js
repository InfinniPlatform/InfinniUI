var errorTextPropertyMixin = {

    initErrorText: function () {
        this.listenTo(this.model, 'change:errorText', this.updateErrorText);
    },

    updateErrorText: function () {
        if (!this.wasRendered) {
            return;
        }
        var errorText = this.model.get('errorText');
        var validationState = 'success';
        var validationMessage = '';
        if (_.isEmpty(errorText) === false) {
            validationMessage = errorText;
            validationState = 'error';
        }

        this.model.set('validationState', validationState);
        this.model.set('validationMessage', validationMessage);
    }
};
