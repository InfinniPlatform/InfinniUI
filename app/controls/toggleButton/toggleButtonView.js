/**
 * @class ToggleButtonView
 * @augments ControlView
 * @mixes editorBaseViewMixin
 */
var ToggleButtonView = ControlView.extend(/** @lends ToggleButtonView.prototype */ _.extend({}, editorBaseViewMixin, {

    template: InfinniUI.Template["controls/toggleButton/template/toggleButton.tpl.html"],

    UI: _.extend({}, editorBaseViewMixin.UI, {
        textOn: '.togglebutton-handle-on',
        textOff: '.togglebutton-handle-off',
        container: '.togglebutton-container'
    }),

    events: {
        'click .togglebutton-box': 'onClickHandler'
    },

    initHandlersForProperties: function(){
        ControlView.prototype.initHandlersForProperties.call(this);
        editorBaseViewMixin.initHandlersForProperties.call(this);

        this.listenTo(this.model, 'change:textOn', this.updateTextOn);
        this.listenTo(this.model, 'change:textOff', this.updateTextOff);
    },

    updateProperties: function(){
        ControlView.prototype.updateProperties.call(this);
        editorBaseViewMixin.updateProperties.call(this);

        this.updateTextOn();
        this.updateTextOff();
    },

    updateFocusable: function () {
        var focusable = this.model.get('focusable');

        if (focusable) {
            this.ui.container.attr('tabindex', 0);
        } else {
            this.ui.container.removeAttr('tabindex');
        }
    },

    updateTextOn: function () {
        var textOn = this.model.get('textOn');
        this.ui.textOn.html(textOn || '&nbsp;');
    },

    updateTextOff: function () {
        var textOff = this.model.get('textOff');
        this.ui.textOff.html(textOff || '&nbsp;');
    },

    render: function () {
        this.prerenderingActions();
        this.renderTemplate(this.template);
        this.updateProperties();

        this.trigger('render');
        this.postrenderingActions();
        //devblockstart
        window.InfinniUI.global.messageBus.send('render', {element: this});
        //devblockstop
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

    updateValue: function () {
        var value = this.model.get('value');
        this.switchClass('toggle', value ? 'on' : 'off', this.$el);
    }
}));
