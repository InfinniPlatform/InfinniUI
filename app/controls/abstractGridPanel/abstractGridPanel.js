var AbstractGridPanelControl = function(){
    _.superClass(AbstractGridPanelControl, this);
};

_.inherit(AbstractGridPanelControl, Control);

_.extend(AbstractGridPanelControl.prototype, {

    addRow: function(row){
        this.controlModel.addRow(row);
    },

    getRows: function(){
        return this.controlModel.getRows();
    }

});