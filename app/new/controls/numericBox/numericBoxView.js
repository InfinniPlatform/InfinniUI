/**
 * @class
 * @augments TextEditorBaseView
 */
var NumericBoxView = TextEditorBaseView.extend(/** @lends TextBoxView.prototype */{

    template: InfinniUI.Template["new/controls/numericBox/template/numericBox.tpl.html"],

    UI: _.extend({}, TextEditorBaseView.prototype.UI),

    events: _.extend({}, TextEditorBaseView.prototype.events, {
        //Отображение поля редактирования для INPUT[TEXT]
        'focus .pl-text-box-input': 'onFocusControlHandler',
        'mouseenter .pl-text-box-input': 'onMouseenterControlHandler'
    }),

    render: function () {
        this.prerenderingActions();
        this.renderTemplate(this.template);
        this.renderNumericBoxEditor();
        this.trigger('render');
        this.postrenderingActions();
        return this;
    },

    getData: function () {
        var
            model = this.model;

        return _.extend({},
            TextEditorBaseView.prototype.getData.call(this), {
                minValue: model.get('minValue'),
                maxValue: model.get('maxValue'),
                increment: model.get('increment')
            });
    },

    renderNumericBoxEditor: function () {
        var model = this.model;

        this.renderControlEditor({
            el: this.ui.editor,
            multiline: false,
            lineCount: 1,
            inputType: model.get('inputType')
        });

        return this;
    },

    initOnChangeHandler: function () {
        TextEditorBaseView.prototype.initOnChangeHandler.call(this);

        this
            .listenTo(this.model, 'change:minValue', this.onChangeMinValueHandler)
            .listenTo(this.model, 'change:maxValue', this.onChangeMaxValueHandler)
            .listenTo(this.model, 'change:increment', this.onChangeIncrementHandler);
    },

    onChangeMinValueHandler: function (model, value) {

    },

    onChangeMaxValueHandler: function (model, value) {

    },

    onChangeIncrementHandler: function (model, value) {

    },

    onChangeEnabledHandler: function (model, value) {
        this.ui.control.prop('disabled', !value);
    },

    /**
     * Используется миксином textEditorMixin
     * @param value
     * @returns {boolean}
     */
    onEditorValidate: function (value) {
        return true;
    }

});
