var ComparatorId = function () {

    this.propertyName = '_id';
};

ComparatorId.prototype.isEqual = function (a, b) {
    var result = false;
    var value1, value2;
    if (a && b) {
        value1 = InfinniUI.ObjectUtils.getPropertyValue(a, this.propertyName);
        value2 = InfinniUI.ObjectUtils.getPropertyValue(b, this.propertyName);
        result = value1 == value2;
    }

    return result;
};