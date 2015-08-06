var CheckBoxView = ControlView.extend({

    template: '<div></div>',

    render: function () {

        this.prerenderingActions();

        this.$el.html(this.template());

        this.bindUIElements();
        this.postrenderingActions();
        return this;
    }

});
