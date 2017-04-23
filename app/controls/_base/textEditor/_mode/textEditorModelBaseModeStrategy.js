/**
 *
 * @constructor
 */
function TextEditorModelBaseModeStrategy() {
}

/**
 * Отображает текстовое представление значения элемента
 * @abstract
 * @param {TextEditorModel} model
 */
TextEditorModelBaseModeStrategy.prototype.updateText = function( model ) {
};

/**
 * Устанавливает значение поля оторажения/ввода значения
 * @param {TextEditorModel} model
 * @param {string} text
 * @param {boolean} ui Признак исзменения со стороны UI
 */
TextEditorModelBaseModeStrategy.prototype.setText = function( model, text, ui ) {
};

/**
 * @param model
 * @param value
 * @param options
 */
TextEditorModelBaseModeStrategy.prototype.onChangeTextHandler = function( model, value, options ) {
};

InfinniUI.TextEditorModelBaseModeStrategy = TextEditorModelBaseModeStrategy;

