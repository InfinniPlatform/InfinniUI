/**
 * @class
 * @augments TextEditorBaseView
 */
var TextBoxView = TextEditorBaseView.extend(/** @lends TextBoxView.prototype */{

    template: {
        oneline: InfinniUI.Template["new/controls/textBox/template/textBoxInput.tpl.html"],
        multiline: InfinniUI.Template["new/controls/textBox/template/textBoxArea.tpl.html"]
    },

    UI: _.extend({}, TextEditorBaseView.prototype.UI),

    events: _.extend({}, TextEditorBaseView.prototype.events, {
        //Отображение поля редактирования для INPUT[TEXT]
        'focus .pl-text-box-input': 'onFocusControlHandler',
        'mouseenter .pl-text-box-input': 'onMouseenterControlHandler',

        //Отображение поля редактирования для TEXTAREA
        'focus .pl-text-area-input': 'onFocusControlHandler',
        'mouseenter .pl-text-area-input': 'onMouseenterControlHandler'
    }),

    render: function () {
        var model = this.model;
        var template = model.get('multiline') ? this.template.multiline : this.template.oneline;

        this.prerenderingActions();
        this.renderTemplate(template);
        this.renderTextBoxEditor();
        this.trigger('render');
        this.postrenderingActions();
        return this;
    },

    getData: function () {
        var data = TextEditorBaseView.prototype.getData.call(this);
        var model = this.model;
        return _.extend(
            data,
            {
                multiline: model.get('multiline'),
                lineCount: model.get('lineCount')
            }
        );
    },

    renderTextBoxEditor: function () {
        var model = this.model;
        this.renderControlEditor({
            el: this.ui.editor,
            multiline: model.get('multiline'),
            lineCount: model.get('lineCount'),
            inputType: model.get('inputType')
        });

        return this;
    },

    initOnChangeHandler: function () {
        TextEditorBaseView.prototype.initOnChangeHandler.call(this);

        this
            .listenTo(this.model, 'change:lineCount', this.onChangeLineCountHandler)
            .listenTo(this.model, 'change:multiline', this.onChangeMultilineHandler)
    },

    onChangeLineCountHandler: function (model, value) {
        if (!value) {
            return;
        }
        this.ui.control.prop('rows', model.get('lineCount'));
    },

    onChangeMultilineHandler: function () {
        this.renderControl();
    },

    onChangeLabelTextHandler: function () {
        this.renderControl();
    },

    onChangeLabelFloatingHandler: function () {
        this.renderControl();
    },

    onChangeDisplayFormatHandler: function ( ){
        this.renderControl();
    },

    onChangeEditMaskHandler: function () {
        this.renderControl();
    },

    onChangeEnabledHandler: function (model, value) {
        this.ui.control.prop('disabled', !value);
    }

});
