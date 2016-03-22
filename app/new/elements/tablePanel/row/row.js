/**
 * @param parent
 * @constructor
 * @augments Container
 */
function Row(parent) {
    _.superClass(Row, this, parent);
}

_.inherit(Row, Container);

_.extend(Row.prototype, {
    createControl: function () {
        return new RowControl();
    }
});