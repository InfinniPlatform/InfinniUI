var ButtonView = ControlView.extend({
    className: 'pl-button',

    template: InfinniUI.Template["controls/button/template/button.tpl.html"],

    events: {

    },

    UI: {
        button: 'button'
    },

    initialize: function () {
        ControlView.prototype.initialize.apply(this);
        this.listenTo(this.model, 'change:text', this.updateText);
        this.listenTo(this.model, 'change:enabled', this.updateEnabled);
        this.listenTo(this.model, 'change:parentEnabled', this.updateEnabled);

    },

    render: function () {
        this.prerenderingActions();

        this.$el
            .html(this.template({image: this.model.get('image')}));

        this.bindUIElements();
        this.updateText();
        this.updateEnabled();

        this.postrenderingActions();
        return this;
    },

    updateText: function(){
        var $button = this.$el.find('.btntext');
        var text = this.model.get('text');

        if(this.wasRendered){
            if (typeof text === 'undefined' || text === null) {
                text = '';
            }
            if(_.isEmpty(text)){
                this.$el.find('.fa-'+this.model.get('image')).css('margin-right','0');
            }
            $button.text(text);
        }
    },

    updateEnabled: function () {
        if (!this.wasRendered) {
            return;
        }
        var pEnabled = this.model.get('parentEnabled');
        var isEnabled = this.model.get('enabled');

        this.ui.button.prop('disabled', !isEnabled || !pEnabled);
    }

});