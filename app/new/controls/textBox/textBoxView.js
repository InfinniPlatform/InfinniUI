/**
 * @class
 * @augments TextEditorBaseView
 */
var TextBoxView = TextEditorBaseView.extend(/** @lends TextBoxView.prototype */{

    template: {
        control: InfinniUI.Template["new/controls/textBox/template/template.tpl.html"],
        oneline: InfinniUI.Template["new/controls/textBox/template/oneline.tpl.html"],
        multiline: InfinniUI.Template["new/controls/textBox/template/multiline.tpl.html"]
    },

    className: 'pl-textbox form-group',

    UI: _.extend({}, TextEditorBaseView.prototype.UI),

    events: _.extend({}, TextEditorBaseView.prototype.events, {
        ////Отображение поля редактирования для INPUT[TEXT]
        //'focus .pl-text-box-input': 'onFocusControlHandler',
        //'mouseenter .pl-text-box-input': 'onMouseenterControlHandler',
        //
        ////Отображение поля редактирования для TEXTAREA
        //'focus .pl-text-area-input': 'onFocusControlHandler',
        //'mouseenter .pl-text-area-input': 'onMouseenterControlHandler'
    }),

    initHandlersForProperties: function(){
        TextEditorBaseView.prototype.initHandlersForProperties.call(this);

        this.listenTo(this.model, 'change:multiline', this.updateMultiline);
        this.listenTo(this.model, 'change:lineCount', this.updateLineCount);
    },

    updateProperties: function(){
        TextEditorBaseView.prototype.updateProperties.call(this);

        this.updateLineCount();
    },

    updateMultiline: function(){
        this.rerender();
    },

    updateLineCount: function(){
        //var lineCount = this.model.get('lineCount');
        //this.ui.control.attr('rows', lineCount);
        //this.ui.editor.attr('rows', lineCount);
    },

    updateFocusable: function () {
        //var focusable = this.model.get('focusable');
        //
        //if (!focusable) {
        //    this.ui.control.attr('tabindex', -1);
        //} else {
        //    this.ui.control.removeAttr('tabindex');
        //}
    },

    render: function () {
        this.prerenderingActions();
        this.renderTemplate(this.template.control);
        this.renderTextBoxEditor();
        this.updateProperties();

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
        var templateEditorMethod = model.get('multiline') ? this.template.multiline : this.template.oneline;
        var editorTemplate = templateEditorMethod.call(null, this.getData());

        this.renderControlEditor(editorTemplate);
    },

    setFocus: function () {
        this.ui.textbox.focus();
    }

});
