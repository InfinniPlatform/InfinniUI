/**
 * @param parent
 * @constructor
 * @augments Container
 */
function TablePanel(parent) {
    _.superClass(TablePanel, this, parent);
}

_.inherit(TablePanel, Container);

_.extend(TablePanel.prototype, {
    createControl: function () {
        return new TablePanelControl();
    }
});