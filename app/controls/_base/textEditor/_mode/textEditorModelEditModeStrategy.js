/**
 * @augments TextEditorModelBaseModeStrategy
 * @constructor
 */
function TextEditorModelEditModeStrategy() {
    TextEditorModelBaseModeStrategy.call(this);
}

TextEditorModelEditModeStrategy.prototype = Object.create(TextEditorModelBaseModeStrategy.prototype);
TextEditorModelEditModeStrategy.prototype.constructor = TextEditorModelBaseModeStrategy;

TextEditorModelEditModeStrategy.prototype.updateText = function (model) {
    var editMask = model.getEditMask();
    var value = model.get('value');
    var text;

    if (!editMask) {
        text = value;
    } else {
        editMask.reset(value);
        text = editMask.getText();
    }

    model.set('text', text);
};