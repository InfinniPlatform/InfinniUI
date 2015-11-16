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

_.extend(ButtonControl.prototype, {

    createControlModel: function () {
        return new ButtonModel();
    },

    createControlView: function (model, viewMode) {
        if(!viewMode || ! viewMode in window.InfinniUI.Button){
            viewMode = 'common';
        }

        var ViewClass = window.InfinniUI.Button.viewModes[viewMode];

        return new ViewClass({model: model});
    }

}, buttonControlMixin);

