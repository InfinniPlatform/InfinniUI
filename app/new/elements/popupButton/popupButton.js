/**
 * @class
 * @constructor
 * @augments Container
 * @augments Button
 */
function PopupButton() {
    _.superClass(PopupButton, this);
    Button.prototype.init.call(this);
}

_.inherit(PopupButton, Container);

_.extend(PopupButton.prototype, Button.prototype, {

    createControl: function () {
        return new PopupButtonControl();
    }

});