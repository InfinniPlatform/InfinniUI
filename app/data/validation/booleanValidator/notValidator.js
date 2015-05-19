/**
 * Объект не должен удовлетворять заданному условию.
 *
 * @constructor
 */
function NotValidator() {

    this.message = null;
    this.property = null;
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
        return generalValidate(this, parentProperty, target, result, function (validator, propertyValue) {
            return (validator.operator === null) || !validator.operator.validate(null, propertyValue, null);
        });
    }
}