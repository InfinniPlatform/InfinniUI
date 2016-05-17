/**
 * @class PasswordBoxView
 * @augments ControlView
 * @mixes editorBaseViewMixin
 */
var PasswordBoxView = ControlView.extend(_.extend({}, editorBaseViewMixin, {

    className: 'pl-password-box form-group',

    template: {
        "autocomplete": InfinniUI.Template["new/controls/passwordBox/template/passwordBox.on.tpl.html"],
        "noautocomplete": InfinniUI.Template["new/controls/passwordBox/template/passwordBox.off.tpl.html"]
    },

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
        this.listenTo(this.model, 'change:autocomplete', this.updateAutocomplete);

    },

    updateProperties: function(){
        ControlView.prototype.updateProperties.call(this);
        editorBaseViewMixin.updateProperties.call(this);
        this.updateLabelText();
        this.updatePasswordChar();
    },

    updateLabelText: function () {
        var labelText = this.model.get('labelText');
        this.ui.label.text(labelText);
    },

    updateAutocomplete: function () {
        this.rerender();
    },

    updatePasswordChar: function () {
        //Can't use on native input[type=password]
    },

    updateValue: function(){
        editorBaseViewMixin.updateValueState.call(this);

        var value = this.model.get('value');
        this.ui.input.val(value);
    },

    updateFocusable: function () {
        var focusable = this.model.get('focusable');

        if (!focusable) {
            this.ui.input.attr('tabindex', -1);
        } else {
            this.ui.input.removeAttr('tabindex');
        }
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
        this.renderTemplate(this.getTemplate());

        this.updateProperties();

        this.trigger('render');
        this.postrenderingActions();
        return this;
    },

    getTemplate: function () {
        var model = this.model;

        return model.get('autocomplete') ? this.template.autocomplete : this.template.noautocomplete;
    },

    onBlurHandler: function () {
        var model = this.model;

        var value = this.ui.input.val();

        model.set('value', value);
    }

}));
