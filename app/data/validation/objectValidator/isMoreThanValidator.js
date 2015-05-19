/**
 * Объект больше заданного объекта.
 *
 * @constructor
 */
function IsMoreThanValidator() {

    this.message = null;
    this.property = null;
    this.value = null;

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
            if (propertyValue !== null && propertyValue !== undefined) {
                return propertyValue > validator.value;
            }

            return false;
        });
    }
}