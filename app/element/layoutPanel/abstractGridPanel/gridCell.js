var GridCell = function(colSpan){
    this.items = [];
    this.colSpan = colSpan || 1;
    this.handlers = {
        onItemsChange: $.Callbacks()
    };
};

_.extend(GridCell.prototype, {

    addItem: function(item){
        this.items.push(item);
        this.handlers.onItemsChange.fire();
    },

    getItems: function(){
        return this.items;
    },

    onItemsChange: function(handler){
        this.handlers.onItemsChange.add(handler);
    }

});