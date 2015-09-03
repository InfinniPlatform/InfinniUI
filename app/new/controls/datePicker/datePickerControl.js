/**
 *
 * @param parent
 * @constructor
 * @augments TextEditorBaseControl
 */
function DatePickerControl(parent) {
    _.superClass(DatePickerControl, this, parent);
}

_.inherit(DatePickerControl, TextEditorBaseControl);

_.extend(DatePickerControl.prototype, {

    createControlModel: function () {
        return new DatePickerModel();
    },

    createControlView: function (model) {
        return new DatePickerView({model: model});
    }
});

