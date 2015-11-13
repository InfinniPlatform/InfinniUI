/**
 * @class
 * @constructor
 * @augments Container
 * @augments Button
 */
function PopupButton() {
    _.superClass(PopupButton, this);
    this.buttonInit();
}

_.inherit(PopupButton, Container);

_.extend(PopupButton.prototype, {

    createControl: function () {
        return new PopupButtonControl();
    }

}, buttonMixin);