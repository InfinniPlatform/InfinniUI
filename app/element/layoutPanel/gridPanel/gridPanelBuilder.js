function GridPanelBuilder() {
}

_.inherit(GridPanelBuilder, AbstractGridPanelBuilder);

_.extend(GridPanelBuilder.prototype, {

    createElement: function(params){
        return new GridPanel(params.parent);
    }

});