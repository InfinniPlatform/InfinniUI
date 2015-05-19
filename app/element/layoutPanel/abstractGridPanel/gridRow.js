var GridRow = function(){
    this.cells = [];
    this.handlers = {
        onCellsChange: $.Callbacks(),
        onItemsChange: $.Callbacks()
    };
};

_.extend(GridRow.prototype, {

    addCell: function(colSpan){
        var cell = new GridCell(colSpan);
        this.cells.push(cell);
        this.handlers.onCellsChange.fire();
        this.initCellHandlers(cell);
        return cell;
    },

    getCells: function(){
        return this.cells;
    },

    onCellsChange: function(handler){
        this.handlers.onCellsChange.add(handler);
    },

    onItemsChange: function(handler){
        this.handlers.onItemsChange.add(handler);
    },

    initCellHandlers: function(cell){
        var self = this;
        cell.onItemsChange(function(){
            self.handlers.onItemsChange.fire();
        });
    }

});