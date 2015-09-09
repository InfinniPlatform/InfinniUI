var editorBaseMixin = {
    initialize_editorBase: function(){

    },

    getValue: function () {
        return this.control.getValue();
    },

    setValue: function (value) {
        this.control.setValue(value);
    },

    getHintText: function () {
        return this.control.get('hintText');
    },

    setHintText: function (value) {
        this.control.set('hintText', value);
    },

    getErrorText: function () {
        return this.control.get('errorText');
    },

    setErrorText: function (value) {
        this.control.set('errorText', value);
    },

    getWarningText: function () {
        return this.control.get('warningText');
    },

    setWarningText: function (value) {
        this.control.set('warningText', value);
    },

    onValueChanging:  function (handler) {
        this.control.onValueChanging(
            this.createControlEventHandler(this, handler, {property: 'value'})
        );
    },

    onValueChanged: function (handler) {
        this.control.onValueChanged(
            this.createControlEventHandler(this, handler, {property: 'value'})
        );
    },

    createControlEventHandler: function(element, handler, additionParams) {
        var context;
        additionParams = additionParams || {};

        if (element.parentView) {
            context = element.parentView.context;
        }

        return function (message) {
            _.extend(
                message,
                additionParams
            );
            message.source = element;

            return handler.call(undefined, context, message);
        };
    }
};