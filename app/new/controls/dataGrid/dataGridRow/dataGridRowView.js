var DataGridRowView = ControlView.extend({

    className: 'pl-datagrid-row',

    tagName: 'tr',

    events: {},

    template: {
        singleSelect: InfinniUI.Template["new/controls/dataGrid/dataGridRow/template/singleSelect.tpl.html"],
        multiSelect: InfinniUI.Template["new/controls/dataGrid/dataGridRow/template/multiSelect.tpl.html"]
    },

    UI: {
        toggle: '.toggle'
    },

    initialize: function () {
        ControlView.prototype.initialize.call(this);
    },

    render: function () {
        this.prerenderingActions();
        var $el = this.$el;


        var templateName = this.model.get('multiSelect') ? 'multiSelect' : 'singleSelect';
        var template = this.template[templateName];
        $el.html(template());
        this.bindUIElements();

        console.log('render row');
        var templates = this.model.get('cellTemplates');
        if (Array.isArray(templates)) {
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

