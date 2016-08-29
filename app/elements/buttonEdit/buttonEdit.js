/**
 *
 * @param parent
 * @constructor
 * @augments TextBox
 */
function ButtonEdit(parent) {
    _.superClass(ButtonEdit, this, parent);
}

window.InfinniUI.ButtonEdit = ButtonEdit;

_.inherit(ButtonEdit, TextBox);

ButtonEdit.prototype.createControl = function (parent) {
    return new ButtonEditControl(parent);
};

/**
 * @public
 * @param {String} icon
 */
ButtonEdit.prototype.setIcon = function (icon) {
    if (icon && icon.toLowerCase) {
        icon = icon.toLowerCase();
    }
    this.control.set('icon', icon);
};

/**
 * @public
 * @returns {String}
 */
ButtonEdit.prototype.getIcon = function () {
    return this.control.get('icon');
};

/**
 * @public
 * @param {boolean} readOnly
 */
ButtonEdit.prototype.setReadOnly = function (readOnly) {
    if (typeof  readOnly !== 'undefined' && readOnly !== null) {
        this.control.set('readOnly', !!readOnly);
    }
};

/**
 * @public
 * @returns {boolean}
 */
ButtonEdit.prototype.getReadOnly = function () {
    return this.control.get('readOnly');
};

/**
 * @public
 * @param {boolean} showClear
 */
ButtonEdit.prototype.setShowClear = function (showClear) {
    if (typeof showClear !== 'undefined' && showClear !== null) {
        this.control.set('showClear', !!showClear);
    }
};

/**
 * @public
 * @returns {boolean}
 */
ButtonEdit.prototype.getShowClear = function () {
    return this.control.get('showClear');
};


ButtonEdit.prototype.onButtonClick = function (handler) {
    var element = this;
    var callback = function (nativeEventData) {
        var eventData = element._getHandlingMouseEventData(nativeEventData);
        handler(eventData);
    };
    return this.control.onButtonClick(callback);
};
