/**
 *
 * @constructor
 * @augments ListEditorBaseControl
 */
function DataGridRowControl() {
    _.superClass(DataGridRowControl, this);
}

_.inherit(DataGridRowControl, Control);

_.extend(DataGridRowControl.prototype, {

    onToggle: function (handler) {
        this.controlView.on('toggle', handler);
    },

    createControlModel: function () {
        return new DataGridRowModel();
    },

    createControlView: function (model) {
        return new DataGridRowView({model: model});
    }
});

