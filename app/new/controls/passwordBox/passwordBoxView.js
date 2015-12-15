/**
 * @class PasswordBoxView
 * @augments ControlView
 * @mixes editorBaseViewMixin
 */
var PasswordBoxView = ControlView.extend(_.extend({}, editorBaseViewMixin, {

    className: 'pl-password-box',

    template: InfinniUI.Template["new/controls/passwordBox/template/passwordBox.tpl.html"],

    UI: _.extend({}, editorBaseViewMixin.UI, {
        label: '.pl-control-label',
        input: '.pl-control'
    }),

    events: {
        'blur .pl-control': 'onBlurHandler'
    },

    initialize: function () {
        ControlView.prototype.initialize.apply(this);
    },

    initHandlersForProperties: function(){
        ControlView.prototype.initHandlersForProperties.call(this);
        editorBaseViewMixin.initHandlersForProperties.call(this);

        this.listenTo(this.model, 'change:labelText', this.updateLabelText);
        this.listenTo(this.model, 'change:labelFloating', this.updateLabelFloating);
        this.listenTo(this.model, 'change:passwordChar', this.updatePasswordChar);
    },

    updateProperties: function(){
        ControlView.prototype.updateProperties.call(this);
        editorBaseViewMixin.updateProperties.call(this);
        this.updateLabelText();
        this.updateLabelFloating();
        this.updatePasswordChar();
    },

    updateLabelText: function () {
        var labelText = this.model.get('labelText');
        this.ui.label.text(labelText);
    },

    updateLabelFloating: function () {
        var labelFloating = this.model.get('labelFloating');
        this.$el.toggleClass("pl-label-floating", labelFloating);
    },

    updatePasswordChar: function () {
        //Can't use on native input[type=password]
    },

    updateValue: function(){
        var value = this.model.get('value');
        this.ui.input.val(value);

        var isEmpty = _.isEmpty(value);
        this.$el.toggleClass("pl-empty-text-editor", isEmpty);
    },

    updateEnabled: function () {
        ControlView.prototype.updateEnabled.call(this);

        var enabled = this.model.get('enabled');
        this.ui.input.prop('disabled', !enabled);
    },

    getData: function () {
        return _.extend(
            {},
            ControlView.prototype.getData.call(this),
            editorBaseViewMixin.getData.call(this)
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

    onBlurHandler: function () {
        var model = this.model;

        var value = this.ui.input.val();

        model.set('value', value);
    }

}));
