function DataGridBuilder() {
    _.superClass(DataGridBuilder, this);
    this.columnBuilder = new DataGridColumnBuilder();
}

_.inherit(DataGridBuilder, ListEditorBaseBuilder);

_.extend(DataGridBuilder.prototype, /** @lends DataGridBuilder.prototype */{

    createElement: function (params) {
        return new DataGrid(params.parent);
    },

    applyMetadata: function (params) {
        ListEditorBaseBuilder.prototype.applyMetadata.call(this, params);

        var metadata = params.metadata;
        /** @type DataGrid **/
        var element = params.element;
        element.setShowSelectors(metadata.ShowSelectors);
        element.setCheckAllVisible(metadata.CheckAllVisible);

        if(metadata.OnCheckAllChanged){
            element.onCheckAllChanged(function(context, args) {
                new ScriptExecutor(element.getScriptsStorage()).executeScript(metadata.OnCheckAllChanged.Name || metadata.OnCheckAllChanged, args);
            });
        }

        if( metadata.OnRowClick ) {
            element.onRowClick(function (args) {
                new ScriptExecutor(element.getScriptsStorage()).executeScript(metadata.OnRowClick.Name || metadata.OnRowClick, args);
            });
        }

        if( metadata.OnRowDoubleClick ) {
            element.onRowDoubleClick(function (args) {
                new ScriptExecutor(element.getScriptsStorage()).executeScript(metadata.OnRowDoubleClick.Name || metadata.OnRowDoubleClick, args);
            });
        }

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
        var builder = this;

        return function (context, args) {
            var row = dataGrid.createRow();
            row.setGrid(dataGrid);

            ['RowStyle', 'RowBackground', 'RowForeground', 'RowTextStyle']
                .forEach(initBindingToRowProperty.bind(null, row, args.index));

            var columns = dataGrid.getColumns();

            var cellItemTemplates = columns.toArray().map(function (column, index) {
                var cellTemplate = column.getCellTemplate();
                var template = cellTemplate(itemsBinding);
                return template.bind(column, context, args);
            });
            row.setCellTemplates(cellItemTemplates);
            row.setMultiSelect(dataGrid.getMultiSelect());
            row.setShowSelectors(dataGrid.getShowSelectors());
            return row;
        };

        function initBindingToRowProperty(row, index, propertyName) {
            var basePathOfProperty = params.basePathOfProperty || new BasePathOfProperty('');
            var argumentForBuilder = {
                element: row,
                parent: dataGrid,
                builder: params.builder,
                metadata: params.metadata,
                parentView: params.parentView
            };
            argumentForBuilder.basePathOfProperty = basePathOfProperty.buildChild('', index);

            builder.initBindingToProperty(argumentForBuilder, propertyName);
        }
    }

});
