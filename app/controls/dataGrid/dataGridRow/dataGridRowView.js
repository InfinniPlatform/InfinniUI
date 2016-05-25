var DataGridRowView = ControlView.extend({

    className: 'pl-datagrid-row pl-datagrid-row_data',

    classNameSelected: 'info',

    tagName: 'tr',

    events: {},

    template: {
        singleSelect: InfinniUI.Template["controls/dataGrid/dataGridRow/template/singleSelect.tpl.html"],
        multiSelect: InfinniUI.Template["controls/dataGrid/dataGridRow/template/multiSelect.tpl.html"],
        dataCell: InfinniUI.Template["controls/dataGrid/dataGridRow/template/dataCell.tpl.html"]
    },

    UI: {
        toggleCell: '.pl-datagrid-row__cell_toggle',
        toggle: '.pl-datagrid-toggle',
        toggleControl: '.pl-datagrid-toggle input'
    },

    initialize: function () {
        ControlView.prototype.initialize.call(this);
        this.childElements = [];
        this.on('render', function () {
            this.ui.toggleCell.on('click', this.onToggleHandler.bind(this));
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
        this.updateShowSelectors();
    },

    updateVerticalAlignment: function () {
        //Use Vertical alignment for DataGrid
    },

    render: function () {
        this.prerenderingActions();
        var $el = this.$el;
        var row = this;

        var templateName = this.model.get('multiSelect') ? 'multiSelect' : 'singleSelect';
        var template = this.template[templateName];
        $el.html(template());
        this.bindUIElements();

        var templates = this.model.get('cellTemplates');
        var templateDataCell = this.template.dataCell;
        if (Array.isArray(templates)) {
            templates.forEach(function (template, index) {
                var $cell = $(templateDataCell());
                var cellElement = template();
                $cell.append(cellElement.render());
                $el.append($cell);
                row.addChildElement(cellElement);
            });
        }
        this.updateProperties();

        this.trigger('render');

        this.postrenderingActions();
        return this;
    },

    updateShowSelectors: function () {
        var showSelectors = this.model.get('showSelectors');
        this.ui.toggleCell.toggleClass('hidden', !showSelectors);
    },

    updateToggle: function () {
        var toggle = this.model.get('toggle');
        this.ui.toggleControl.prop('checked', !!toggle);
    },

    updateSelected: function () {
        var selected = this.model.get('selected');
        this.$el.toggleClass(this.classNameSelected, !!selected);
    },

    updateEnabled: function () {
        ControlView.prototype.updateEnabled.call(this);

        var enabled = this.model.get('enabled');
        this.ui.toggleControl.attr('disabled', enabled ? null : 'disabled');
    },

    onToggleHandler: function (event) {
        this.trigger('toggle');
    },

    addChildElement: function (element) {
        this.childElements.push(element);
    },

    removeChildElements: function () {
        this.childElements.forEach(function (element) {
            element.remove();
        });

        this.childElements.length = 0;
    },

    remove: function () {
        this.removeChildElements();
        ControlView.prototype.remove.call(this);
    }


});

