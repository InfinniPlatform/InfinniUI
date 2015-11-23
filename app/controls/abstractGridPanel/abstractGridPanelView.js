var AbstractGridPanelView = ControlView.extend({

    templates: {
        row: null,
        cell: null
    },

    initialize: function () {
        ControlView.prototype.initialize.apply(this);
        this.initLayoutPanelViewMixin();
        this.listenTo(this.model, 'rowsIsChange', this.rerender);
        this.listenTo(this.model, 'cellsIsChange', this.rerender);
        this.listenTo(this.model, 'itemsIsChange', this.rerender);
    },

    render: function () {
        var $row;
        this.prerenderingActions();

        this.$el
            .empty();

        _.each(this.model.getRows(), function(row){
            $row = this.renderRow(row);
            this.$el
                .append($row);
        }, this);

        this.postrenderingActions();
        return this;
    },

    renderRow: function(row){
        var $row = $(this.templates.row({})),
            $cell;

        _.each(row.getCells(), function(cell){
            $cell = this.renderCell(cell);
            $row.append($cell);
        }, this);

        return $row;
    },

    renderCell: function(cell){
        var $cell = $(this.templates.cell({colSpan: cell.colSpan})),
            $item;

        _.each(cell.getItems(), function(item){
            $item = this.renderItem(item);
            $cell.append($item);
        }, this);

        return $cell;
    },

    renderItem: function(item){
        return item.render();
    }

});

_.extend(AbstractGridPanelView.prototype, layoutPanelViewMixin);