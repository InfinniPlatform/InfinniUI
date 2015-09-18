/**
 * @class ToggleButtonView
 * @augments ControlView
 * @mixes editorBaseViewMixin
 */
var ToggleButtonView = ControlView.extend(/** @lends ToggleButtonView.prototype */ _.extend({}, editorBaseViewMixin, {

    template: InfinniUI.Template["new/controls/toggleButton/template/toggleButton.tpl.html"],

    UI: _.extend({}, editorBaseViewMixin.UI, {
        textOn: '.togglebutton-label-on',
        textOff: '.togglebutton-label-off',
        container: '.togglebutton-container'
    }),

    events: {
        'click': 'onClickHandler'
    },

    render: function () {
        this.prerenderingActions();
        this.renderTemplate(this.template);
        this.postrenderingActions();
        this.trigger('render');
        this.applyValue();
        return this;
    },

    getData: function () {
        var model = this.model;

        return _.extend({},
            ControlView.prototype.getData.call(this),
            editorBaseViewMixin.getData.call(this),
            {
                textOn: model.get('textOn'),
                textOff: model.get('textOff')
            }
        );
    },


    onClickHandler: function (event) {
        var model = this.model;
        model.set('value', !model.get('value'));
    },

    initOnChangeHandler: function () {
        ControlView.prototype.initOnChangeHandler.call(this);
        editorBaseViewMixin.initOnChangeHandler.call(this);

        var model = this.model;

        this
            .listenTo(model, 'change:textOn', this.updateTextOn)
            .listenTo(model, 'change:textOff', this.updateTextOff)
            .listenTo(model, 'change:value', this.onChangeValueHandler);
    },

    updateTextOn: function (model, value) {
        this.ui.textOn.text(value);
    },

    updateTextOff: function (model, value) {
        this.ui.textOff.text(value);
    },

    onChangeValueHandler: function (model, value) {
        this.applyValue();
    },

    applyValue: function () {
        var value = this.model.get('value');
        this.switchClass('toggle', value ? 'on' : 'off', this.$el);
    }
}));
