var editorBaseViewMixin = {
    UI: {
        hintText: '.pl-control-hint-text',
        warningText: '.pl-control-warning-text',
        errorText: '.pl-control-error-text'
    },

    getData: function () {
        var model = this.model;

        return {
            guid: model.get('guid'),
            value: model.get('value'),
            hintText: model.get('hintText'),
            errorText: model.get('errorText'),
            warningText: model.get('warningText')
        }
    },

    initOnChangeHandler: function () {

        this
            .listenTo(this.model, 'change:hintText', this.onChangeHintTextHandler)
            .listenTo(this.model, 'change:errorText', this.onChangeErrorTextHandler)
            .listenTo(this.model, 'change:warningText', this.onChangeWarningTextHandler)
            .listenTo(this.model, 'change:value', this.onChangeValueHandler)
    },

    onChangeHintTextHandler: function (model, value) {
        this.ui.hintText.text(value);
    },

    onChangeErrorTextHandler: function (model, value) {
        this.ui.errorText.text(value);
    },

    onChangeWarningTextHandler: function (model, value) {
        this.ui.warningText.text(value);
    },

    /**
     * @abstract
     * @param model
     * @param value
     */
    onChangeValueHandler: function (model, value) {
        throw new Error('Не реализован обработчик editorBaseViewMixin.onChangeValueHandler');
    }
};
