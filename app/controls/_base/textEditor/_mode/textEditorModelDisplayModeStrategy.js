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

TextEditorModelDisplayModeStrategy.prototype.setText = function (model, text, ui) {
    if (ui) {
        //Изменение значения в поле ввода для режима просмотра - результат срабатывания автозаполнения браузера
        model.set('text', text, {ui: ui});
    }
};

TextEditorModelDisplayModeStrategy.prototype.onChangeTextHandler = function (model, text, options) {
    if (options.ui) {
        var value = model.convertValue(text);
        model.set('value', value);
    }
    model.applyChanges();
};