/**
 * @TODO Если маска заполнена не полностью - не выходить из режима редактирования
 */
var TextEditorModel = Backbone.Model.extend({

    Mode: {
        Edit: 'edit',
        Display: 'display'
    },

    initialize: function () {

        this.initEditMode();

        this.on('change:originalValue', this.onChangeOriginalValueHandler);
        this.on('change:value', this.onChangeValueHandler);
        this.on('change:mode', this.onChangeModeHandler);
        this.on('change:text', function (model, text) {
            var mode = model.get('mode');
            if (mode === this.Mode.Edit) {
                var editMask = model.getEditMask();
                var value = editMask ?  editMask.getData() : text;
                model.set('value', model.convertValue(value), {silent: !!editMask});
            }
        });
    },

    convertValue: function (value) {
        var converter = this.get('valueConverter');

        return (typeof converter === 'function') ? converter.call(this, value) : value;
    },

    initEditMode: function () {
        this.modeStrategies = {};
        this.modeStrategies[this.Mode.Edit] = new TextEditorModelEditModeStrategy();
        this.modeStrategies[this.Mode.Display] = new TextEditorModelDisplayModeStrategy();

        this.updateEditModeStrategy();
    },

    defaults: function () {
        return {
            mode: this.Mode.Display
        };
    },

    updateEditModeStrategy: function () {
        var mode = this.get('mode');
        this.set('modeStrategy', this.modeStrategies[mode]);
    },

    onChangeModeHandler: function (model, mode, options) {
        this.updateEditModeStrategy();
        this.updateText();

        var prevMode = this.previous('mode');

        if (options.cancel) {
            this.cancelChanges();
        } else if (mode === this.Mode.Display && prevMode === this.Mode.Edit) {
            //При успешном переходе из режима редактирования в режим отображения - обновляем исходное значение
            this.applyChanges();
        }
    },

    /**
     *
     * @param {boolean} [cancel = false]
     * @param {boolean} [validate = true]
     */
    setDisplayMode: function (cancel, validate) {
        cancel = !!cancel;
        validate = (typeof validate === 'undefined') ? true : !!validate;

        this.set('mode', this.Mode.Display, {
            cancel: cancel,
            validate: validate
        });

    },

    applyChanges: function () {
        var value = this.get('value');
        this.set('originalValue', value);
    },

    cancelChanges: function () {
        var value = this.get('originalValue');
        this.set('value', value);
    },

    setText: function (text) {
        this.set('text', text);
    },

    getEditMask: function () {
        return this.get('editMask');
    },

    getValue: function () {
        return this.get('value');
        //
        //
        //var editMask = this.getEditMask();
        //var value;
        //
        //if (editMask) {
        //    value = editMask.getValue()
        //} else {
        //    value = this.$el.val();
        //}

        //return value;
    },

    getDisplayFormat: function () {
        return this.get('displayFormat');
    },

    setEditMode: function () {
        this.set('mode', this.Mode.Edit);
    },

    validate: function (attrs, options) {

        //@TODO Если меняется Mode Edit => Display, проверить введенное значение!!!
        var validateValue = this.get('validateValue'),
            value = this.getValue();

        if (_.isFunction(validateValue)) {
            return validateValue.call(null, value);
        }
    },

    updateText: function () {
        var modeStrategy = this.get('modeStrategy');
        modeStrategy.updateText(this);
    },

    onChangeValueHandler: function (/* model, value */) {
        this.updateText();
    },

    onChangeOriginalValueHandler: function (model, originalValue) {
        model.set('value', originalValue, {originalValue: true});
        this.updateText();
    }

});