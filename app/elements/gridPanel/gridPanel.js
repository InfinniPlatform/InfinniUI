/**
 * @param parent
 * @constructor
 * @augments Container
 */
function GridPanel(parent) {
    _.superClass(GridPanel, this, parent);
}

_.inherit(GridPanel, Container);

_.extend(GridPanel.prototype, {
    createControl: function () {
        return new GridPanelControl();
    }
});