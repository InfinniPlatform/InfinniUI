var AbstractGridPanelModel = ControlModel.extend({

    defaults: _.defaults({
        rows: null
    }, ControlModel.prototype.defaults),

    initialize: function(){
        this.set('rows', [])

        ControlModel.prototype.initialize.apply(this);
    },

    addRow: function(row){
        this.get('rows').push(row);
        this.trigger('rowsIsChange', this.get('rows'));
        this.initRowHandlers(row);
    },

    getRows: function(){
        return this.get('rows');
    },

    initRowHandlers: function(row){
        var self = this;

        row.onCellsChange( function(){
            self.trigger('cellsIsChange');
        });

        row.onItemsChange( function(){
            self.trigger('itemsIsChange');
        });
    }

});