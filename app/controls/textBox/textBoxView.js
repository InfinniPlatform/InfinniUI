/**
 * @class
 * @augments TextEditorBaseView
 */
var TextBoxView = TextEditorBaseView.extend(/** @lends TextBoxView.prototype */{

    template: {
        oneline: InfinniUI.Template["controls/textBox/template/oneline.tpl.html"],
        multiline: InfinniUI.Template["controls/textBox/template/multiline.tpl.html"]
    },

    className: 'pl-textbox form-group',

    UI: _.extend({}, TextEditorBaseView.prototype.UI),

    events: _.extend({}, TextEditorBaseView.prototype.events, {

    }),

    initHandlersForProperties: function(){
        TextEditorBaseView.prototype.initHandlersForProperties.call(this);

        this.listenTo(this.model, 'change:multiline', this.updateMultiline);
        this.listenTo(this.model, 'change:lineCount', this.updateLineCount);
        this.listenTo(this.model, 'change:type', this.updateType);
    },

    updateProperties: function(){
        TextEditorBaseView.prototype.updateProperties.call(this);

        this.updateLineCount();
        this.updateType();
    },

    updateMultiline: function(){
        this.rerender();
    },

    updateLineCount: function(){
        var lineCount = this.model.get('lineCount');
        this.ui.editor.attr('rows', lineCount);
    },

    updateType: function () {
        var type = this.model.get('type');
        this.ui.control.attr('type', type);
        this.ui.editor.find('.pl-control-editor').attr('type', type);
    },

    render: function () {
        this.prerenderingActions();

        var model = this.model;
        var template = model.get('multiline') ? this.template.multiline : this.template.oneline;

        this.renderTemplate(template);
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
        this.renderControlEditor();
    }

});
