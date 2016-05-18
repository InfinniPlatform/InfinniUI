/**
 *
 * @param parent
 * @constructor
 * @augments TextEditorBase
 */
function NumericBox(parent) {
    _.superClass(NumericBox, this, parent);
}

_.inherit(NumericBox, TextEditorBase);

NumericBox.prototype.createControl = function (parent) {
    return new NumericBoxControl(parent);
};

NumericBox.prototype.getMinValue = function () {
    return this.control.get('minValue');
};

NumericBox.prototype.setMinValue = function (value) {
    this.control.set('minValue', value);
};

NumericBox.prototype.getMaxValue = function () {
    return this.control.get('maxValue');
};

NumericBox.prototype.setMaxValue = function (value) {
    this.control.set('maxValue', value);
};

NumericBox.prototype.getIncrement = function () {
    return this.control.get('increment');
};

NumericBox.prototype.setIncrement = function (value) {
    this.control.set('increment', value);
};

/**
 * @public
 * @description Устанваливает начальное значение
 * @param {Number} value
 */
NumericBox.prototype.setStartValue = function (value) {
    this.control.set('startValue', value);
};

/**
 * @public
 * @description Возвращает начальное значение
 * @returns {Number}
 */
NumericBox.prototype.getStartValue = function () {
    return this.control.get('startValue');
};