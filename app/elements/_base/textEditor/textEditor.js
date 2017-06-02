/**
 * @constructor
 */
var TextEditor = function() {
    var model = new TextEditorModel();

    model.on( 'invalid', function( model, error ) {
        console.log( 'error', error );
    } );

    //@TODO Handle Enabled state

    this._model = model;
};

InfinniUI.TextEditor = TextEditor;

/**
 *
 * @param displayFormat
 * @returns {TextEditor}
 */
TextEditor.prototype.setDisplayFormat = function( displayFormat ) {
    this._model.set( 'displayFormat', displayFormat );
    return this;
};

/**
 *
 * @param editMask
 * @returns {TextEditor}
 */
TextEditor.prototype.setEditMask = function( editMask ) {
    this._model.set( 'editMask', editMask );
    return this;
};

/**
 *
 * @param validatorValue
 * @returns {TextEditor}
 */
TextEditor.prototype.setValidatorValue = function( validatorValue ) {
    this._model.set( 'validateValue', validatorValue );
    return this;
};

/**
 *
 * @param converter
 * @returns {TextEditor}
 */
TextEditor.prototype.setValueConverter = function( converter ) {
    this._model.set( 'valueConverter', converter );
    return this;
};

/**
 *
 * @returns {*}
 */
TextEditor.prototype.getValue = function() {
    return this._model.getValue();
};

/**
 *
 * @param {HTMLInputElement} inputElement
 * @returns {*}
 */
TextEditor.prototype.render = function( inputElement ) {
    this._view = new TextEditorView( {
        model: this._model,
        el: inputElement
    } );
    //return this._view.render();
};

/**
 *
 * @param value
 * @returns {TextEditor}
 */
TextEditor.prototype.setValue = function( value ) {
    this._model.set( 'originalValue', value, { originalValue: true } );
    return this;
};

/**
 *
 * @param handler
 */
TextEditor.prototype.onValueChanged = function( handler ) {
    this._model.on( 'change:originalValue', function( model, value, options ) {
        if( options.originalValue === true ) {
            return;
        }

        handler.call( null, value );
    } );
};

/**
 *
 * @param value
 */
TextEditor.prototype.setCaretPosition = function( value ) {
    this._view.setCaretPosition( value );
};
