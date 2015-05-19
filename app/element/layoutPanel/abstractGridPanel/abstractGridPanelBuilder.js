function AbstractGridPanelBuilder() {
}

_.inherit(AbstractGridPanelBuilder, ElementBuilder);

_.extend(AbstractGridPanelBuilder.prototype, {

    applyMetadata: function(params){
        ElementBuilder.prototype.applyMetadata.call(this, params);

        var metadata = params.metadata,
            gridPanel = params.element,
            row, cell, item;

        _.each(metadata.Rows, function (metadataItem, rowIndex) {
            row = gridPanel.addRow();

            if (metadataItem.Cells) {
                _.each(metadataItem.Cells, function (cellMetadata, cellIndex) {
                    cell = row.addCell(cellMetadata.ColumnSpan);

                    if (cellMetadata.Items) {
                        _.each(cellMetadata.Items, function (itemMetadata) {
                            item = params.builder.build(params.parent, itemMetadata, params.collectionProperty);
                            cell.addItem(item);
                        }, this);
                    }
                }, this);
            }
        }, this);
    }

});