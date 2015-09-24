/**
 * @param parent
 * @augments Element
 * @constructor
 */
function Button(parent) {
    _.superClass(Button, this, parent);
}

_.inherit(Button, Element);

Button.prototype.getContent = function () {
    return this.control.get('content');
};

Button.prototype.setContent = function (value) {
    this.control.set('content', value);
};

Button.prototype.setAction = function (value) {
    this.control.set('action', value);

    this.onClick(function () {
        if (value) {
            value.execute();
        }
    });
};

Button.prototype.onClick = function (handler) {
    this.control.onClick(handler);
};

Button.prototype.click = function () {
    this.control.click();
};


