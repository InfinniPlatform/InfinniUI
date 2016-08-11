/**
 * @param parent
 * @augments Button
 * @constructor
 */
function LinkElement(parent) {
    _.superClass(LinkElement, this, parent);
}

_.inherit(LinkElement, Button);

LinkElement.prototype.createControl = function () {
    return new LinkElementControl();
};

LinkElement.prototype.setHref = function (value) {
    this.control.set('href', value);
};

LinkElement.prototype.getHref = function () {
    return this.control.get('href');
};

LinkElement.prototype.setTarget = function (value) {
    this.control.set('target', value);
};

LinkElement.prototype.getTarget = function () {
    return this.control.get('target');
};
