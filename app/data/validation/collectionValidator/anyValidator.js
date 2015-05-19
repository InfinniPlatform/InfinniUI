/**
 * Один из элементов коллекции удовлетворяют заданному условию.
 *
 * @constructor
 */
function AnyValidator() {

    this.operator = null;

    /**
     * Проверяет объект.
     *
     * @public
     * @param {string} parentProperty Путь к проверяемому объекту.
     * @param {object} target Проверяемый объект.
     * @param {object} result Результат проверки.
     * @returns {boolean} Успешность проверки.
     */
    this.validate = function (parentProperty, target, result) {
        var isValid = false;
        var compositeResult = null;

        if (target !== null && this.operator !== null) {

            compositeResult = new ValidationResult();

            for (var i = 0; i < target.length; ++i) {
                var element = target[i];

                if (this.operator.validate(combinePropertyPath(parentProperty, i), element, compositeResult)) {
                    isValid = true;
                    break;
                }
            }
        }

        copyValidationResult(result, isValid, compositeResult);

        return isValid;
    }
}