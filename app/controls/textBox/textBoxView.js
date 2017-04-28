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
    },

    updateProperties: function(){
        TextEditorBaseView.prototype.updateProperties.call(this);

        this.updateLineCount();
    },

    updateMultiline: function(){
        this.rerender();
    },

    updateLineCount: function(){
        var lineCount = this.model.get('lineCount');
        this.ui.editor.attr('rows', lineCount);
    },

    render: function () {
        this.prerenderingActions();

        var model = this.model;
        var template = model.get('multiline') ? this.template.multiline : this.template.oneline;

        this.renderTemplate(template);

        this.updateProperties();

        this.trigger('render');
        this.postrenderingActions();
        //devblockstart
        window.InfinniUI.global.messageBus.send('render', {element: this});
        //devblockstop
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
    }

});
