/**
 *
 * @param parent
 * @constructor
 * @augments ContainerControl
 */
function StackPanelControl(viewMode) {
    _.superClass(StackPanelControl, this, viewMode);
}

_.inherit(StackPanelControl, ContainerControl);

_.extend(StackPanelControl.prototype,
    /** @lends StackPanelControl.prototype */
    {
        createControlModel: function () {
            return new StackPanelModel();
        },

        createControlView: function (model, viewMode) {
            var view = new StackPanelView({model: model});

            view.viewMode = viewMode;

            return view;
        }
    }
);

