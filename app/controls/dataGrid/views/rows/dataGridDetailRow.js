var DataGridDetailRow = DataGridBaseRow.extend({

    className: 'datagrid-row-detail',

    UI: {
        detail: '.data-grid-detail'
    },

    template: InfinniUI.Template['controls/dataGrid/template/rows/detail.tpl.html'],

    initialize: function (options) {
        this.options = options;
        this.listenTo(options.grid, 'change:value', this.OnChangeValueHandler);
    },

    initTemplate: function () {
        var options = this.options;
        var columns = options.columns;

        this.$el.html(this.template({
            colspan: columns.length + 1
        }));

        //По умолчанию скрываем
        this.$el.addClass('hidden');
    },

    renderCells: function () {
        var options = this.options;
        var itemTemplate = options.itemTemplate;
        var itemFormat = options.itemFormat;
        var index = options.index;
        var itemTemplateElement;
        var text;

        if (typeof itemTemplate === 'function') {
            itemTemplateElement = itemTemplate(index).render();
            this.ui.detail.append(itemTemplateElement);
        } else if (typeof itemFormat !== 'undefined' && itemFormat !== null) {
            text = itemFormat.format(options.row);
            this.ui.detail.append(text);
        }

    }

});
