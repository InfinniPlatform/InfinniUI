/**
 * @class
 * @constructor
 * @augments Container
 * @augments Button
 */
function PopupButton(parent, viewMode) {
    _.superClass(PopupButton, this, parent, viewMode);
    this.buttonInit();
}

_.inherit(PopupButton, Container);

_.extend(PopupButton.prototype, {

    createControl: function (viewMode) {
        return new PopupButtonControl(viewMode);
    }

}, buttonMixin);