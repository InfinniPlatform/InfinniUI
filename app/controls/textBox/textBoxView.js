/**
 * @class
 * @augments TextEditorBaseView
 */
var TextBoxView = TextEditorBaseView.extend(/** @lends TextBoxView.prototype */{

    template: {
        oneline: InfinniUI.Template["controls/textBox/template/textBoxInput.tpl.html"],
        multiline: InfinniUI.Template["controls/textBox/template/textBoxArea.tpl.html"]
    },

    className: 'pl-textbox form-group',

    UI: _.extend({}, TextEditorBaseView.prototype.UI),

    events: _.extend({}, TextEditorBaseView.prototype.events, {
        //Отображение поля редактирования для INPUT[TEXT]
        'focus .pl-text-box-input': 'onFocusControlHandler',
        'mouseenter .pl-text-box-input': 'onMouseenterControlHandler',

        //Отображение поля редактирования для TEXTAREA
        'focus .pl-text-area-input': 'onFocusControlHandler',
        'mouseenter .pl-text-area-input': 'onMouseenterControlHandler'
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
        this.ui.control.attr('rows', lineCount);
        this.ui.editor.attr('rows', lineCount);
    },

    updateType: function () {
        var type = this.model.get('type');
        this.ui.control.attr('type', type);
        this.ui.editor.find('.pl-control-editor').attr('type', type);
    },

    updateFocusable: function () {
        var focusable = this.model.get('focusable');

        if (!focusable) {
            this.ui.control.attr('tabindex', -1);
        } else {
            this.ui.control.removeAttr('tabindex');
        }
    },

    render: function () {
        var model = this.model;
        var template = model.get('multiline') ? this.template.multiline : this.template.oneline;

        this.prerenderingActions();
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
        var model = this.model;
        this.renderControlEditor({
            el: this.ui.editor,
            multiline: model.get('multiline'),
            lineCount: model.get('lineCount'),
            inputType: model.get('inputType')
        });

        return this;
    },

    setFocus: function () {
        this.ui.textbox.focus();
    }

});
