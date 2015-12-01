var DataGridRowView = ControlView.extend({

    className: 'pl-datagrid-row',

    tagName: 'tr',

    events: {

    },

    render: function () {
        this.prerenderingActions();
        var $el = this.$el;

        $el.empty();
        console.log('render row');
        var templates = this.model.get('cellTemplates');
        if(Array.isArray(templates)) {
            templates.forEach(function (template) {
                var $cell = $('<td></td>');
                $cell.append(template().render());
                $el.append($cell);
            });
        }
        this.updateProperties();

        this.trigger('render');

        this.postrenderingActions();
        return this;
    }

});

