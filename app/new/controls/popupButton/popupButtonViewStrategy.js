/**
 *
 * @param {PopupButtonControl} popupButton
 * @constructor
 */
function PopupButtonViewStrategy(popupButton) {
    /** @member {PopupButtonViewStrategy} */
    this.popupButton = popupButton;
}


/**
 * @abstract
 * @protected
 */
PopupButtonViewStrategy.prototype.template = function () {
    return '';
};

/**
 * @abstract
 * @public
 */
PopupButtonViewStrategy.prototype.render = function () {

};


