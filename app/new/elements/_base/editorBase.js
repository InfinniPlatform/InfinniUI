function editorBaseMixin() {

    this.getValue = function () {
        return this.control.getValue();
    };

    this.setValue = function (value) {
        this.control.setValue(value);
    };

    this.getHintText = function () {
        return this.control.get('hintText');
    };

    this.setHintText = function (value) {
        this.control.set('hintText', value);
    };

    this.getErrorText = function () {
        return this.control.get('errorText');
    };

    this.setErrorText = function (value) {
        this.control.set('errorText', value);
    };

    this.getWarningText = function () {
        return this.control.get('warningText');
    };

    this.setWarningText = function (value) {
        this.control.set('warningText', value);
    };

    this.onValueChanging =  function (handler) {
        this.control.onValueChanging(
            createControlEventHandler(this, handler, {property: 'value'})
        );
    };

    this.onValueChanged = function (handler) {
        this.control.onValueChanged(
            createControlEventHandler(this, handler, {property: 'value'})
        );
    };


    function createControlEventHandler(element, handler, additionParams) {
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
}
