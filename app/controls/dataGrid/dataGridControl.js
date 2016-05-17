/**
 *
 * @constructor
 * @augments ListEditorBaseControl
 */
function DataGridControl() {
    _.superClass(DataGridControl, this);
}

_.inherit(DataGridControl, ListEditorBaseControl);

_.extend(DataGridControl.prototype, {

    createControlModel: function () {
        return new DataGridModel();
    },

    createControlView: function (model) {
        return new DataGridView({model: model});
    },

    onCheckAllChanged: function (handler) {
        this.controlModel.onCheckAllChanged(handler);
    }
});

