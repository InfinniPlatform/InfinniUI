/**
 * Объект должен удовлетворять хотя бы одному из заданных условий.
 *
 * @constructor
 */
function OrValidator() {

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
        var isValid = false;
        var compositeResult = null;

        if (this.operators != null) {
            var propertyPath = combinePropertyPath(parentProperty, this.property);
            var propertyValue = InfinniUI.ObjectUtils.getPropertyValue(target, this.property);

            compositeResult = new ValidationResult();

            for (var i = 0; i < this.operators.length; ++i) {
                var operator = this.operators[i];

                if (operator.validate(propertyPath, propertyValue, compositeResult)) {
                    isValid = true;
                    break;
                }
            }
        }

        copyValidationResult(result, isValid, compositeResult);

        return isValid;
    }
}