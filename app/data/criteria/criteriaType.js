var CriteriaType = (function () {

    return {
        IsEquals: IsEquals,
        IsNotEquals: IsNotEquals,
        IsMoreThan: IsMoreThan,
        IsLessThan: IsLessThan,
        IsMoreThanOrEquals: IsMoreThanOrEquals,
        IsLessThanOrEquals: IsLessThanOrEquals,
        IsContains: IsContains,
        IsNotContains: IsNotContains,
        IsEmpty: IsEmpty,
        IsNotEmpty: IsNotEmpty,
        IsStartsWith: IsStartsWith,
        IsNotStartsWith: IsNotStartsWith,
        IsEndsWith: IsEndsWith,
        IsNotEndsWith: IsNotEndsWith,
        IsIn: IsIn,
        isNotIn: isNotIn
    };

    function IsEquals(target, property, value) {
        return InfinniUI.ObjectUtils.getPropertyValue(target, property) === value;
    }

    function IsNotEquals(target, property, value) {
        return !IsEquals(target, property, value);
    }

    function IsMoreThan(target, property, value) {
        return InfinniUI.ObjectUtils.getPropertyValue(target, property) > value;
    }

    function IsLessThan(target, property, value) {
        return InfinniUI.ObjectUtils.getPropertyValue(target, property) < value;
    }

    function IsMoreThanOrEquals(target, property, value) {
        return InfinniUI.ObjectUtils.getPropertyValue(target, property) >= value;
    }

    function IsLessThanOrEquals(target, property, value) {
        return InfinniUI.ObjectUtils.getPropertyValue(target, property) <= value;
    }

    function IsContains(target, property, value) {
        var text = String(InfinniUI.ObjectUtils.getPropertyValue(target, property));
        return text.indexOf(value) !== -1;
    }

    function IsNotContains(target, property, value) {
        return !IsContains(target, property, value);
    }

    function IsEmpty(target, property, value) {
        var data = InfinniUI.ObjectUtils.getPropertyValue(target, property);

        return typeof data === 'undefined' || _.isEmpty(data);
    }

    function IsNotEmpty(target, property, value) {
        return !IsEmpty(target, property, value);
    }

    function IsStartsWith(target, property, value) {
        var text = String(InfinniUI.ObjectUtils.getPropertyValue(target, property));
        return text.indexOf(value) === 0;
    }

    function IsNotStartsWith(target, property, value) {
        return !IsStartsWith(target, property, value);
    }

    function IsEndsWith(target, property, value) {
        var
            searchValue = String(value),
            text = String(InfinniUI.ObjectUtils.getPropertyValue(target, property));

        var i = text.lastIndexOf(searchValue);

        return (i === -1) ? false : i + searchValue.length === text.length;
    }

    function IsNotEndsWith(target, property, value) {
        return !IsEndsWith(target, property, value);
    }

    function IsIn(target, property, value) {
        var
            data = InfinniUI.ObjectUtils.getPropertyValue(target, property),
            match = false;

        if (Array.isArray(value)) {
            for (var i = 0; i < value.length; i = i + 1) {
                if (data === value[i]) {
                    match = true;
                    break;
                }
            }
        }

        return match;
    }

    function isNotIn(target, property, value) {
        return !IsIn(target, property, value);
    }

})();
