/**
 * @description Представление для рендеринга ячеек заголовка таблицы
 * @class ataGridHeaderCell
 */
var DataGridHeaderCell = Backbone.View.extend({

    tagName: 'th',

    UI: {
        resize: '.pl-datagrid-resize'
    },

    template: InfinniUI.Template['controls/dataGrid/template/cells/headerCell.tpl.html'],

    initialize: function (options) {
        this.listenTo(this.model, 'change:text', this.onChangeTextHandler);
        this.listenTo(this.model, 'change:visible', this.onChangeVisibleHandler);
        this.listenTo(this.model, 'change:image', this.onChangeImageHandler);
        this.listenTo(this.model, 'change:sortable', this.onChangeSortableHandler);
        this.listenTo(this.model, 'change:sorting', this.onChangeSortingHandler);
        this.listenTo(this.model, 'change:Resizable', this.onChangeResizableHandler);

        this.resize = new DataGridColumnResize(this, options.columnIndex);

        var header = this;

        this.resize.onStart(function (x, y) {
            header.trigger('resize:start', x, y, options.columnIndex);
        });

        this.resize.onDrag(function (x, y) {
            var $el = header.$el;
            var offset = $el.offset();
            if (offset.left < x) {
                header.trigger('resize', x, y, options.columnIndex);
            } else {
                //@TODO Ограничить минимальную ширину колонки
                header.trigger('resize', offset.left, y, options.columnIndex);
            }

        });

        this.resize.onStop(function (x, y) {
            var $el = header.$el;

            var offset = $el.offset();
            var position = $el.position();

            var width = x - offset.left;

            header.trigger('resize:stop', x, y, width, options.columnIndex);

        });
    },

    events: {
        click: 'onClickHandler',
        'mousedown .pl-datagrid-resize': 'onClickResizeHandler'
    },

    onClickResizeHandler: function (event) {
        this.resize.start(event);
    },

    render: function () {
        this.wasRendered = true;
        this.applyVisible();
        this.applySortable();
        this.$el.html(this.template(this.model.toJSON()));
        this.bindUIElements();

        this.applyResizable();
        return this;
    },

    applyVisible: function () {
        this.$el.toggleClass('hidden', this.model.get('visible') === false);
    },

    onChangeTextHandler: function () {
        if (this.wasRendered) {
            this.render();
        }
    },

    onChangeVisibleHandler: function () {
        if (this.wasRendered) {
            this.applyVisible();
        }
    },

    onChangeImageHandler: function () {
        if (this.wasRendered) {
            this.render();
        }
    },

    onChangeSortableHandler: function (sortable) {
        if (this.wasRendered) {
            this.applySortable();
        }
    },

    onChangeResizableHandler: function () {
        if (this.wasRendered) {
            this.applyResizable();
        }
    },

    applyResizable: function () {
        this.ui.resize.toggleClass('hidden', !this.model.get('resizable'));
    },

    applySortable: function () {
        var sortable = this.model.get('sortable');

        this.model.set('sorting', sortable ? DataGridColumnModel.SORTING_NONE : false);
    },



    onClickHandler: function (event) {
        event.stopPropagation();
        this.toggleSorting();
    },

    onChangeSortingHandler: function () {
        var sorting = this.model.get('sorting');

        this.$el.toggleClass('sorting_asc', sorting === DataGridColumnModel.SORTING_ASC);
        this.$el.toggleClass('sorting_desc', sorting === DataGridColumnModel.SORTING_DESC);
        this.$el.toggleClass('sorting', sorting === DataGridColumnModel.SORTING_NONE);
    },

    toggleSorting: function () {
        var sortable = this.model.get('sortable');
        var sorting = this.model.get('sorting');

        if (!sortable) {
            return;
        }

        switch (sorting) {
            case DataGridColumnModel.SORTING_ASC:
                sorting = DataGridColumnModel.SORTING_DESC;
                break;
            case DataGridColumnModel.SORTING_DESC:
            default:
                sorting = DataGridColumnModel.SORTING_ASC;
        }

        this.model.set('sorting', sorting);
    }

});

_.extend(DataGridHeaderCell.prototype, bindUIElementsMixin);
