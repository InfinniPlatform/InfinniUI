/**
 * @description Работа с ValueProperty @see {@link http://demo.infinnity.ru:8081/display/MC/BaseListElement|BaseListElement}
 */
window.InfinniUI.ValueProperty = (function () {

    function getPropertyValue(item, valueProperty) {
        return InfinniUI.ObjectUtils.getPropertyValue(item, valueProperty);
    }

    var getValue = function (item, valueProperty) {
        var value;

        if (_.isEmpty(valueProperty)) {
            value = item;
        } else if (_.isObject(valueProperty)) {
            value = {};
            for (var i in valueProperty) {
                if (!valueProperty.hasOwnProperty(i)) {
                    continue;
                }
                value[i] = getPropertyValue(item, valueProperty[i]);
            }
        } else {
            value = getPropertyValue(item, valueProperty);
        }

        return value;
    };

    return {
        getValue: getValue
    }
})();