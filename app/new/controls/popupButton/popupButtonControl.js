function PopupButtonControl(viewMode) {
    _.superClass(PopupButtonControl, this, viewMode);
}

_.inherit(PopupButtonControl, ContainerControl);

_.extend(PopupButtonControl.prototype, /** @lends PopupButtonControl.prototype */ {

    createControlModel: function () {
        return new PopupButtonModel();
    },

    createControlView: function (model, viewMode) {
        if(!viewMode || ! viewMode in window.InfinniUI.PopupButton){
            viewMode = 'common';
        }

        var ViewClass = window.InfinniUI.PopupButton.viewModes[viewMode];

        return new ViewClass({model: model});
    }

}, buttonControlMixin);

