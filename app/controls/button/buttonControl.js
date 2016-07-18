/**
 *
 * @param parent
 * @constructor
 * @augments Control
 */
function ButtonControl(viewMode) {
    _.superClass(ButtonControl, this, viewMode);
}

_.inherit(ButtonControl, Control);

_.extend(
    ButtonControl.prototype,
    highlightMixin.control, {

        createControlModel: function () {
            return new ButtonModel();
        },

        createControlView: function (model, viewMode) {
            if (!viewMode || !viewMode in window.InfinniUI.viewModes.Button) {
                viewMode = 'common';
            }

            var ViewClass = window.InfinniUI.viewModes.Button[viewMode];

            return new ViewClass({model: model});
        }

    }, buttonControlMixin);

