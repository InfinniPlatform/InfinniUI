var ButtonView = ControlView.extend({
    className: 'pl-button',

    template: InfinniUI.Template["controls/button/template/button.tpl.html"],

    events: {
        'click button': 'onClickHandler'
    },

    UI: {
        button: 'button'
    },

    initialize: function () {
        ControlView.prototype.initialize.apply(this);
        this.listenTo(this.model, 'change:text', this.updateText);
    },

    render: function () {
        this.prerenderingActions();

        this.$el
            .html(this.template({}));

        this.bindUIElements();
        this.updateText();
        this.updateEnabled();

        this.postrenderingActions();
        return this;
    },

    updateText: function(){
        var $button = this.$el.find('.btn');
        var text = this.model.get('text');

        if(this.wasRendered){
            $button.text(text);
        }
    },

    onClickHandler: function(){
        this.trigger('onClick');
    },

    updateEnabled: function () {
        if (!this.wasRendered) {
            return;
        }
        var isEnabled = this.model.get('enabled');
        this.ui.button.prop('disabled', !isEnabled);
    }

});