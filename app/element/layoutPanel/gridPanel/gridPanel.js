function GridPanel(parentView) {
    _.superClass(GridPanel, this, parentView);
}

_.inherit(GridPanel, AbstractGridPanel);

GridPanel.prototype.createControl = function () {
    return new GridPanelControl();
};

_.extend(GridPanel.prototype, layoutPanelMixin);