/**
 * Объект должен удовлетворять всем заданным условиям.
 *
 * @constructor
 */
function AndValidator() {

    this.message = null;
    this.property = null;
    this.operators = [];

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
        var isValid = true;
        var compositeResult = null;

        if (this.operators != null) {
            var propertyPath = combinePropertyPath(parentProperty, this.property);
            var propertyValue = InfinniUI.ObjectUtils.getPropertyValue(target, this.property);

            compositeResult = new ValidationResult();

            for (var i = 0; i < this.operators.length; ++i) {
                var operator = this.operators[i];
                isValid = operator.validate(propertyPath, propertyValue, compositeResult) && isValid;
            }
        }

        copyValidationResult(result, isValid, compositeResult);

        return isValid;
    }
}