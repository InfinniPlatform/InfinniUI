var CheckBoxView = ControlView.extend({
    className: 'pl-check-box',

    template: InfinniUI.Template["controls/checkBox/template/checkbox.tpl.html"],

    events: {
        'click [type="checkbox"]': 'onClick',
        'focusin [type="checkbox"]': 'onFocusInDebounceHandler',
        'focusout [type="checkbox"]': 'onFocusOutDebounceHandler',
        'focus [type="checkbox"]': 'onFocusControlHandler'

    },

    onFocusInHandler: function (event) {
        this.callEventHandler('OnGotFocus');
    },

    onFocusOutHandler: function (event) {
        this.callEventHandler('OnLostFocus');
    },

    initialize: function () {
        ControlView.prototype.initialize.apply(this);

        this.initHorizontalTextAlignment();
        this.initForeground();
        this.initTextStyle();

        this.onFocusInDebounceHandler = _.debounce(this.onFocusInHandler, 100);
        this.onFocusOutDebounceHandler = _.debounce(this.onFocusOutHandler, 100);

        this.listenTo(this.model, 'change:value', this.updateValue);
        this.listenTo(this.model, 'change:enabled', this.applyEnabled);
        this.listenTo(this.model, 'change:text', this.updateText);
    },

    render: function () {
        this.prerenderingActions();

        this.$el.html(this.template({}));
        this.$el.find('input:checkbox').uniform();

        this.updateText();
        this.updateValue();
        this.applyEnabled();

        this.updateForeground();
        this.updateTextStyle();
        this.updateHorizontalTextAlignment();

        this.postrenderingActions();
        return this;
    },

    onClick: function (event) {
        this.model.set('value', event.target.checked);
    },

    updateValue: function () {
        var $control = this.$el.find('.pl-control'),
            val = this.model.get('value');

        if (this.wasRendered) {
            $control.prop('checked', val);
            $.uniform.update($control);
        }
    },

    applyEnabled: function () {
        var enabled = this.model.get('enabled');
        var $control = this.$el.find('.pl-control');
        var $checker = this.$el.find('.checker');

        if (enabled) {
            $control.prop('disabled', false);
            $checker.removeClass('disabled');
        } else {
            $control.prop('disabled', 'disabled');
            $checker.addClass('disabled');
        }
    },

    updateText: function () {
        if (this.wasRendered) {

            var text = this.model.get('text');
            if (typeof text == 'string') {
                this.$el.find('.pl-control-text').html(text);
            }

        }
    }
});

_.extend(CheckBoxView.prototype,
    horizontalTextAlignmentPropertyMixin,
    foregroundPropertyMixin,
    textStylePropertyMixin
);