/**
 * Результат проверки объекта.
 *
 * @constructor
 */
function ValidationResult() {

    /**
     * @member {boolean} IsValid Признак успешности проверки.
     */
    this.IsValid = true;

    /**
     * @member {boolean} Items Список результатов проверки свойств объекта.
     */
    this.Items = [];
}

/**
 * Реализует базовую логику проверки объекта.
 *
 * @public
 * @param {*} validator Объект, предоставляющий интерфейс проверки.
 * @param {string} propertyPath Путь к родительскому объекту в dot-notation.
 * @param {object} target Родительский объект для проверки.
 * @param {object} result Результат проверки объекта.
 * @param {function} validateFunc Функция проверки.
 * @returns {boolean} Успешность проверки.
 */
function generalValidate(validator, propertyPath, target, result, validateFunc) {
    // Получаем значение свойства родительского объекта
    var property = validator.property;
    var propertyValue = InfinniUI.ObjectUtils.getPropertyValue(target, property);

    // Выполняем проверку свойства с помощью функции
    var isValid = validateFunc(validator, propertyValue);

    // Добавляем результат проверки свойства
    setValidationResult(result, isValid, propertyPath, property, validator.message);

    return isValid;
}

/**
 * Добавляет результат проверки объекта.
 *
 * @public
 * @param {object} result Результат проверки объекта.
 * @param {boolean} isValid Успешность проверки объекта.
 * @param {string} parent Путь к родительскому объекту в dot-notation.
 * @param {string} property Относительный путь к дочернему объекту в dot-notation.
 * @param {string} message Сообщение об ошибке.
 */
function setValidationResult(result, isValid, parent, property, message) {
    if (result !== null && result !== undefined) {
        result.IsValid = isValid;

        if (!isValid) {
            if (result.Items === null || result.Items === undefined) {
                result.Items = [];
            }

            var item = {
                Property: combinePropertyPath(parent, property),
                Message: message
            };

            result.Items.push(item);
        }
    }
}

/**
 * Копирует результат проверки объекта.
 *
 * @public
 * @param {object} result Результат проверки объекта.
 * @param {boolean} isValid Успешность проверки объекта.
 * @param {object} source Копируемый результат проверки объекта.
 */
function copyValidationResult(result, isValid, source) {
    if (result !== null && result !== undefined) {

        result.IsValid = isValid;

        if (!isValid
            && source !== null && source !== undefined
            && source.Items !== null && source.Items !== undefined) {

            if (result.Items === null || result.Items === undefined) {
                result.Items = [];
            }

            for (var i = 0; i < source.Items.length; ++i) {
                result.Items.push(source.Items[i]);
            }
        }
    }
}

/**
 * Возвращает объединенный путь к объекту в dot-notation.
 *
 * @public
 * @param {string} parent Путь к родительскому объекту в dot-notation.
 * @param {string} property Относительный путь к дочернему объекту в dot-notation.
 * @returns {string} Объединенный путь к дочернему объекту в dot-notation.
 */
function combinePropertyPath(parent, property) {
    var result= parent;

    if (parent !== null && parent !== undefined) {
        parent = parent.toString();
    }else{
        parent = '';
    }

    if (property !== null && property !== undefined) {
        property = property.toString();
    }

    var parentIsNull = _.isEmpty(parent);
    var propertyIsNull = _.isEmpty(property);

    if (!parentIsNull && !propertyIsNull) {
        result += "." + property;
    }
    else if (parentIsNull) {
        result = property;
    }

    if (result === null || result === undefined) {
        result = "";
    }

    return result;
}