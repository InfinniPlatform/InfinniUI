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

        var cellElements = this.model.get('cellElements');
        // var templateDataCell = this.template.dataCell();
        if (Array.isArray(cellElements)) {
            cellElements.forEach(function (cellElement, index) {
	            // @TODO remove hardcoded template when the memory leaks of dataBindings would have fixed
	            // bug related to task JK-4516
                var $cell = $('<td class="pl-datagrid-row__cell"></td>');
                $cell.append(cellElement.render());
                $el.append($cell);
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
    }


});

