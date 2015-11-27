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

    createControlModel: function () {
        return new DataGridRowModel();
    },

    createControlView: function (model) {
        return new DataGridRowView({model: model});
    }
});

