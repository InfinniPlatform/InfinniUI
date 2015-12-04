var DataGridRowView = ControlView.extend({

    className: 'pl-datagrid-row',

    classNameSelected: 'info',

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
        this.on('render', function () {
            this.ui.toggle.on('click', this.onToggleHandler.bind(this));
        }, this);
    },

    initHandlersForProperties: function () {
        ControlView.prototype.initHandlersForProperties.call(this);
        this.listenTo(this.model, 'change:toggle', this.updateToggle);
        this.listenTo(this.model, 'change:selected', this.updateSelected);
    },

    updateProperties: function () {
        ControlView.prototype.updateProperties.call(this);
        this.updateToggle();
        this.updateSelected();
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
    },

    updateToggle: function () {
        var toggle = this.model.get('toggle');
        this.ui.toggle.prop('checked', !!toggle);
    },

    updateSelected: function () {
        var selected = this.model.get('selected');
        this.$el.toggleClass(this.classNameSelected, !!selected);
    },

    onToggleHandler: function (event) {
        this.trigger('toggle');
    }

});

