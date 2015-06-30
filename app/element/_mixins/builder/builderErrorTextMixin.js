var builderErrorTextMixin = {

    initErrorText: function (params) {
        var element = params.element;
        element.setErrorText(params.metadata.ErrorText);
    }
};