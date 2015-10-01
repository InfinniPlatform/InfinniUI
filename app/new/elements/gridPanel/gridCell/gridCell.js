/**
 * @param parent
 * @constructor
 * @augments Container
 */
function GridRow(parent) {
    _.superClass(GridRow, this, parent);
}

_.inherit(GridRow, Container);

_.extend(GridRow.prototype, {
    createControl: function () {
        return new GridRowControl();
    }
});