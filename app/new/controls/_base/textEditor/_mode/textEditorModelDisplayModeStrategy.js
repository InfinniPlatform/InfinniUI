/**
 * @augments TextEditorModelBaseModeStrategy
 * @constructor
 */
function TextEditorModelDisplayModeStrategy() {
    TextEditorModelBaseModeStrategy.call(this);
}

TextEditorModelDisplayModeStrategy.prototype = Object.create(TextEditorModelBaseModeStrategy.prototype);
TextEditorModelDisplayModeStrategy.prototype.constructor = TextEditorModelDisplayModeStrategy;
TextEditorModelDisplayModeStrategy.prototype.updateText = function (model) {
    var displayFormat = model.getDisplayFormat();
    var value = model.get('value');

    var text;

    if (_.isFunction(displayFormat)) {
        text = displayFormat.call(null, null, {value: value});
    } else {
        text = value;
    }

    model.set('text', text);
};