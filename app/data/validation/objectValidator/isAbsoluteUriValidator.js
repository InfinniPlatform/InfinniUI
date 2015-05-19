/**
 * Объект является абсолютным URI.
 *
 * @constructor
 */
function IsAbsoluteUriValidator() {

    this.message = null;

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
            return propertyValue !== null
                && propertyValue !== undefined
                && typeof propertyValue === "string"
                && /^((http|https):\/\/)/.test(propertyValue);
        });
    }
}