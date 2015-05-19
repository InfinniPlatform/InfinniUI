var CheckBoxView = ControlView.extend({
    className: 'pl-check-box',

    template: _.template('<label><input class="pl-control pl-check-box-control" type="checkbox"><span class="pl-control-text"></span></label>'),

    events: {
        'click [type="checkbox"]': 'onClick'
    },

    initialize: function () {
        ControlView.prototype.initialize.apply(this);
        this.listenTo(this.model, 'change:value', this.updateValue);
        this.listenTo(this.model, 'change:readOnly', this.applyReadOnly);
        this.listenTo(this.model, 'change:enabled', this.applyReadOnly);
        this.listenTo(this.model, 'change:text', this.updateText);
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

    applyReadOnly: function () {
        var readOnly = this.model.get('readOnly');
        var enabled = this.model.get('enabled');
        var $control = this.$el.find('.pl-control');
        var $checker = this.$el.find('.checker');

        if (enabled && !readOnly) {
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
    },

    render: function () {
        this.prerenderingActions();

        this.$el.html(this.template({}));
        this.$el.find('input:checkbox').uniform();

        this.updateText();
        this.updateValue();
        this.applyReadOnly();

        this.postrenderingActions();
        return this;
    }
});