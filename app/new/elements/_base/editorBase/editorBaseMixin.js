var editorBaseMixin = {
    initialize_editorBase: function(){

    },

    getValue: function () {
        return this.control.getValue();
    },

    setValue: function (value) {
        this.control.setValue(value);
    },

    getLabelFloating: function () {
        return this.control.get('labelFloating');
    },

    setLabelFloating: function (value) {
        this.control.set('labelFloating', value);
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


    validateValue: function (value) {

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
    }

};