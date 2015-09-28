/**
 * @param parent
 * @augments Element
 * @constructor
 */
function Button(parent) {
    _.superClass(Button, this, parent);
    this.isFirstAction = true;
}

_.inherit(Button, Element);

Button.prototype.getContent = function () {
    return this.control.get('content');
};

Button.prototype.setContent = function (value) {
    this.control.set('content', value);
};

Button.prototype.setAction = function (value) {
    var control = this.control;
    control.set('action', value);

    if (this.isFirstAction) {
        this.isFirstAction = false;

        this.onClick(function () {
            var action =control.get('action');
            if (action ) {
                action .execute();
            }
        });
    }
};

Button.prototype.getAction = function () {
    return this.control.get('action');
};

Button.prototype.onClick = function (handler) {
    this.control.onClick(handler);
};

Button.prototype.click = function () {
    this.control.click();
};

Button.prototype.createControl = function () {
    return new ButtonControl();
};


