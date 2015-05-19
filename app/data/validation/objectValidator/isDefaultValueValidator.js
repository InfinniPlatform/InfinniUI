/**
 * Объект является значением по умолчанию для данного типа.
 *
 * @constructor
 */
function IsDefaultValueValidator() {

    this.message = null;
    this.property = null;

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
                var propertyType = typeof propertyValue;

                switch (propertyType) {
                    case "number":
                    case "integer":
                    case "Double":
                        return (propertyValue === 0);
                    case "boolean":
                        return (propertyValue === false);
                    case "string":
                        return (propertyValue === "");
                    default:
                        return false;
                }
            }

            return true;
        });
    }
}