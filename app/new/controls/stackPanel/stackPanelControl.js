/**
 *
 * @param parent
 * @constructor
 * @augments ContainerControl
 */
function StackPanelControl(parent) {
    _.superClass(StackPanelControl, this, parent);
}

_.inherit(StackPanelControl, ContainerControl);

_.extend(StackPanelControl.prototype,
    /** @lends StackPanelControl.prototype */
    {
        createControlModel: function () {
            return new StackPanelModel();
        },

        createControlView: function (model) {
            return new StackPanelView({model: model});
        }
    }
);

