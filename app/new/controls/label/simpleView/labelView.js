/**
 * @class SimpleLabelView
 * @augments ControlView
 * @mixes editorBaseViewMixin
 */
var SimpleLabelView = ControlView.extend(_.extend({}, editorBaseViewMixin, /** @lends LabelView.prototype */{
    className: 'pl-label',

    template: InfinniUI.Template["new/controls/label/template/label.tpl.html"],

    UI: _.extend({}, editorBaseViewMixin.UI, {
        control: '.label-control'
    }),

    initialize: function () {
        ControlView.prototype.initialize.apply(this);
    },

    initHandlersForProperties: function(){
        ControlView.prototype.initHandlersForProperties.call(this);
        editorBaseViewMixin.initHandlersForProperties.call(this);

        this.listenTo(this.model, 'change:displayFormat', this.updateDisplayFormat);
        this.listenTo(this.model, 'change:textWrapping', this.updateTextWrapping);
        this.listenTo(this.model, 'change:textTrimming', this.updateTextTrimming);
        this.listenTo(this.model, 'change:lineCount', this.updateLineCount);
    },

    updateProperties: function(){
        ControlView.prototype.updateProperties.call(this);
        editorBaseViewMixin.updateProperties.call(this);
    },

    updateValue: function(){
        var textForLabel = this.getLabelText();
        this.ui.control
            .text(textForLabel)
            .attr('title', textForLabel);
    },

    updateDisplayFormat: function(){
        this.updateValue();
    },

    updateTextWrapping: function(){
        var textWrapping = this.model.get('textWrapping');
        this.ui.control.toggleClass('pl-text-wrapping', textWrapping);
    },

    updateTextTrimming: function(){
        var textTrimming = this.model.get('textTrimming');
        this.ui.control.toggleClass('pl-text-trimming', textTrimming);
    },

    updateText: function () {
        this.updateValue();
    },

    updateLineCount: function(){

    },

    getData: function () {
        return _.extend(
            {},
            ControlView.prototype.getData.call(this),
            editorBaseViewMixin.getData.call(this),
            {
                text: this.getLabelText() 
            }
        );
    },

    render: function () {
        var model = this.model;

        this.prerenderingActions();
        this.renderTemplate(this.template);

        this.updateProperties();

        this.trigger('render');
        this.postrenderingActions();
        return this;
    },

    getLabelText: function () {
        var model = this.model;
        var value = model.get('value');
        var text;
        var format = model.get('displayFormat');

        if (typeof value !== 'undefined' && value !== null) {
            text = typeof format === 'function' ? format(null, {value: value}) : value;
        }else{
            text = this.model.get('text');
            if (typeof text === 'undefined' || text == null) {
                text = '';
            }
        }

        return text;
    }

}));

InfinniUI.ObjectUtils.setPropertyValueDirect(window.InfinniUI, 'Label.viewModes.simple', SimpleLabelView);