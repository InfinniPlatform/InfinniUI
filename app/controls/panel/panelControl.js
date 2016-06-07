/**
 *
 * @param parent
 * @constructor
 * @augments ContainerControl
 */
function PanelControl(parent) {
    _.superClass(PanelControl, this, parent);
}

_.inherit(PanelControl, ContainerControl);

_.extend(PanelControl.prototype, /** @lends PanelControl.prototype */ {
    createControlModel: function () {
        return new PanelModel();
    },

    createControlView: function (model) {
        return new PanelView({model: model});
    }

});

