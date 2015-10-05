/**
 *
 * @param parent
 * @constructor
 * @augments Control
 * @mixes editorBaseControlMixin
 */
function ImageBoxControl(parent) {
    _.superClass(ImageBoxControl, this, parent);
    this.initialize_editorBaseControl();
}

_.inherit(ImageBoxControl, Control);

_.extend(ImageBoxControl.prototype, {

    createControlModel: function () {
        return new ImageBoxModel();
    },

    createControlView: function (model) {
        return new ImageBoxView({model: model});
    }
}, editorBaseControlMixin);

