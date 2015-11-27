var DataGridRowView = ControlView.extend({

    className: 'pl-datagrid-row',

    tagName: 'tr',

    events: {

    },

    render: function () {
        this.prerenderingActions();

        this.$el.empty();

        console.log(this.model.toJSON());


        this.updateProperties();

        this.trigger('render');

        this.postrenderingActions();
        return this;
    }

});

