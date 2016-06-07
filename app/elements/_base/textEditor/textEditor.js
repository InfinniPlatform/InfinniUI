/**
 * @constructor
 */

var TextEditor = function () {
    var model = new TextEditorModel();

    var view = new TextEditorView({
        model: model
    });

    model.on('invalid', function (model, error) {
        console.log('error', error);
    });

    //@TODO Handle ReadOnly & Enabled state

    this._model = model;
    this._view = view;

};

TextEditor.prototype.setDisplayFormat = function (displayFormat) {
    this._model.set('displayFormat', displayFormat);
    return this;
};

TextEditor.prototype.setEditMask = function (editMask) {
    this._model.set('editMask', editMask);
    return this;
};

TextEditor.prototype.setValidatorValue = function (validatorValue) {
    this._model.set('validateValue', validatorValue);
    return this;
};

TextEditor.prototype.setInputTemplate = function (inputTemplate) {
    this._model.set('inputTemplate', inputTemplate);
    return this;
};

/**
 *
 * @param {function|string} inputTemplate
 * @returns {*}
 */
TextEditor.prototype.render = function (inputTemplate) {
    this.setInputTemplate(inputTemplate);

    return this._view.render();
};

TextEditor.prototype.setValue = function (value) {
    this._model.set('originalValue', value);
    return this;
};

TextEditor.prototype.onChangeValue = function (handler) {
    this._model.on('change:originalValue', function (model, value, options) {
        if (options.originalValue === true) {
            return;
        }

        handler.call(null, value);
    });
};