var GridPanelControl = function () {
    _.superClass(GridPanelControl, this);
};

_.inherit(GridPanelControl, AbstractGridPanelControl);

_.extend(GridPanelControl.prototype, {
    createControlModel: function () {
        return new GridPanelModel();
    },

    createControlView: function (model) {
        return new GridPanelView({model: model});
    },

    getChildElements: function () {
        var rows = this.controlModel.getRows();
        var elements = [];
        for (var i = 0, ln = rows.length; i < ln; i = i + 1) {
            var cells = rows[i].getCells();
            for (var j = 0, ln2 = cells.length; j < ln2; j = j + 1) {
                Array.prototype.push.apply(elements, cells[j].getItems());
            }
        }

        return elements;
    }
});
