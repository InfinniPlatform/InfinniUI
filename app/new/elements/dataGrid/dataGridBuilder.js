function DataGridBuilder() {
    _.superClass(DataGridBuilder, this);
}

_.inherit(DataGridBuilder, ListEditorBaseBuilder);

_.extend(DataGridBuilder.prototype, /** @lends DataGridBuilder.prototype */{

    createElement: function (params) {
        return new DataGrid(params.parent);
    },

    applyMetadata: function (params) {
        ListEditorBaseBuilder.prototype.applyMetadata.call(this, params);

        this.applyColumnsMetadata(params);
    },

    applyColumnsMetadata: function (params) {
        var metadata = params.metadata,
            element = params.element,
            collection = element.getColumns();

        if (Array.isArray(metadata.Columns)) {
            var columns = metadata.Columns.map(function (columnMetaData) {
                return this.buildColumn(columnMetaData, params);
            }, this);

            collection.reset(columns);
        }

    },

    buildColumn: function (metadata, params) {
        return this.columnBuilder.build(params.element, metadata, params);
    },

    buildItemProperty: function (itemsBinding, itemPropertyMetadata, params) {
        var dataGrid = params.element;

        return function (context, args) {
            var index = args.index;
            var row = new DataGridRow(dataGrid);
            var sourceProperty;
            var source = itemsBinding.getSource();
            var binding = new DataBinding(this);

            sourceProperty = index.toString();
            if (itemsBinding.getSourceProperty() != '') {
                sourceProperty = itemsBinding.getSourceProperty() + '.' + sourceProperty;
            }
            if (itemPropertyMetadata != '') {
                sourceProperty = sourceProperty + '.' + itemPropertyMetadata;
            }

            binding.bindSource(source, sourceProperty);
            binding.bindElement(row, 'value');

            return row;
        };
    }

});

DataGridBuilder.prototype.columnBuilder = new DataGridColumnBuilder();