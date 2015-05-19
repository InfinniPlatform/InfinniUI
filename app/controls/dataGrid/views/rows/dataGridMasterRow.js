var DataGridMasterRow = DataGridBaseRow.extend({

    className: 'datagrid-row-master',

    template: InfinniUI.Template['controls/dataGrid/template/rows/master.tpl.html'],

    UI: {
        expand: '.datagrid-expand',
        collapse: '.datagrid-collapse'
    },

    initialize: function (options) {
        this.options = options;
        this.listenTo(options.grid, 'change:value', this.OnChangeValueHandler);
    },

    bindUIEvents: function () {
        this.ui.expand.on('click', this.onExpandClick.bind(this));
        this.ui.collapse.on('click', function (event) {event.preventDefault();});
    },

    /**
     * @description Обработчик expand/collapse для master/detail
     */
    onExpandClick: function (event) {
        event.stopPropagation();
        this.$el.toggleClass('expanded');
        var expanded = this.$el.hasClass('expanded');

        this.$el.next().toggleClass('hidden', !expanded);
    }


});
