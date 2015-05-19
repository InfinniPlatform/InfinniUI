var SearchPanelView = ControlView.extend({
    className: 'pl-search-panel',

    template: InfinniUI.Template["controls/searchPanel/template/template.tpl.html"],

    events: {
        'submit form': 'submitFormHandler',
        'click .btn_remove': 'onButtonRemoveClickHandler',
        'input .form-control': 'onUpdateUIValue'
    },

    initialize: function () {
        ControlView.prototype.initialize.apply(this);
        this.listenTo(this.model, 'change:value', this.updateValue);
    },

    render: function () {
        this.prerenderingActions();

        this.$el
            .html(this.template({
                placeholder: this.model.get('text')
            }));

        this.updateValue();
        this.updateEnabled();

        this.postrenderingActions();
        return this;
    },

    submitFormHandler: function(event){
        event.preventDefault();
        this.trigger('onValueChanged',this.model.get('value'));
    },

    updateEnabled: function () {
        ControlView.prototype.updateEnabled.apply(this);

        if (this.wasRendered) {
            var isEnabled = this.model.get('enabled'),
                $control = this.$el.find('.form-control'),
                $button_search = this.$el.find('.btn_search'),
                $button_remove = this.$el.find('.btn_remove');
            $control.prop('disabled', !isEnabled);
            $button_search.prop('disabled', !isEnabled);
            $button_remove.prop('disabled', !isEnabled);
        }
    },

    updateValue : function () {

        if (this.wasRendered) {
            this.$el.find('.form-control').val(this.model.get('value'));
        }
    },

    onUpdateUIValue : function(e){
        var newVal = $(e.target).val();
        this.model.set('value', newVal);
    },

    onButtonRemoveClickHandler: function() {
        this.model.set('value','');
        this.render();
        this.trigger('onValueChanged',this.model.get('value'));
    }
});