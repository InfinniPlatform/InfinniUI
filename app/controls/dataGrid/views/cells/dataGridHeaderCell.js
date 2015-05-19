/**
 * @description Представление для рендеринга ячеек заголовка таблицы
 * @class ataGridHeaderCell
 */
var DataGridHeaderCell = Backbone.View.extend({

    tagName: 'th',

    template: InfinniUI.Template['controls/dataGrid/template/cells/headerCell.tpl.html'],

    initialize: function (options) {
        this.listenTo(this.model, 'change:text', this.onChangeTextHandler);
        this.listenTo(this.model, 'change:visible', this.onChangeVisibleHandler);
        this.listenTo(this.model, 'change:image', this.onChangeImageHandler);
        this.listenTo(this.model, 'change:sortable', this.onChangeSortableHandler);
        this.listenTo(this.model, 'change:sorting', this.onChangeSortingHandler);

    },

    events: {
        click: 'onClickHandler'
    },

    render: function () {
        this.wasRendered = true;
        this.applyVisible();
        this.applySortable();
        this.$el.html(this.template(this.model.toJSON()));
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
