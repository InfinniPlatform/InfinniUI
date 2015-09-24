/**
 * @class LabelView
 * @augments ControlView
 * @mixes editorBaseViewMixin
 */
var LabelView = ControlView.extend(_.extend({}, editorBaseViewMixin, /** @lends LabelView.prototype */{
    className: 'pl-label',

    template: InfinniUI.Template["new/controls/label/template/label.tpl.html"],

    UI: _.extend({}, editorBaseViewMixin.UI, {
        control: 'label',
        container: 'div'
    }),

    initialize: function () {
        ControlView.prototype.initialize.apply(this);

        //this.initHorizontalTextAlignment();
        //this.initUpdateLineCount();
        //this.initTextWrapping();
        //this.initForeground();
        //this.initBackground();
        //this.initTextStyle();
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
        this.trigger('render');
        this.postrenderingActions();
        return this;
    },

    initOnChangeHandler: function () {
        ControlView.prototype.initOnChangeHandler.call(this);
        editorBaseViewMixin.initOnChangeHandler.call(this);

        this
            .listenTo(this.model, 'change:displayFormat', this.onChangeDisplayFormatHandler)
            .listenTo(this.model, 'change:textWrapping', this.onChangeTextWrappingHandler)
            .listenTo(this.model, 'change:lineCount', this.onChangeLineCountHandler)
    },

    onChangeDisplayFormatHandler: function () {
        this.updateText();
    },

    onChangeValueHandler: function() {
        this.updateText();
    },

    onChangeTextWrappingHandler: function (model, value) {

    },

    onChangeLineCountHandler: function (model, value) {

    },

    updateText: function () {
        if (!this.wasRendered) {
            return;
        }

        var
            control = this.ui.control,
            text = this.getLabelText();

        control.attr('title', text);
        control.text(text);
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

//_.extend(LabelView.prototype,
//    horizontalTextAlignmentPropertyMixin,
//    foregroundPropertyMixin,
//    backgroundPropertyMixin,
//    textStylePropertyMixin,
//    lineCountPropertyMixin,
//    textWrappingPropertyMixin
//);