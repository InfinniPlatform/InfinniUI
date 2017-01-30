/**
 * @constructor
 */

var TextEditor = function () {
    var model = new TextEditorModel();
    
    model.on('invalid', function (model, error) {
        console.log('error', error);
    });

    //@TODO Handle Enabled state

    this._model = model;

};

window.InfinniUI.TextEditor = TextEditor;

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

TextEditor.prototype.setValueConverter = function (converter) {
    this._model.set('valueConverter', converter);
    return this;
};

TextEditor.prototype.getValue = function() {
    return this._model.getValue();
};

/**
 *
 * @param {HTMLInputElement} inputElement
 * @returns {*}
 */
TextEditor.prototype.render = function (inputElement) {

    this._view = new TextEditorView({
        model: this._model,
        el: inputElement
    });

    //return this._view.render();
};

TextEditor.prototype.setValue = function (value) {
    this._model.set('originalValue', value, {originalValue: true});
    return this;
};

TextEditor.prototype.onValueChanged = function (handler) {
    this._model.on('change:originalValue', function (model, value, options) {
        if (options.originalValue === true) {
            return;
        }

        handler.call(null, value);
    });
};

TextEditor.prototype.setCaretPosition = function (value) {
	this._view.setCaretPosition(value);
};
