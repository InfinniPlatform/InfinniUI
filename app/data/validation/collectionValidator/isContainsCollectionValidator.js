/**
 * Коллекция содержит заданное значение.
 *
 * @constructor
 */
function IsContainsCollectionValidator() {

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
                for (var i = 0; i < propertyValue.length; ++i) {
                    var element = propertyValue[i];

                    if (element === validator.value) {
                        return true;
                    }
                }
            }

            return false;
        });
    }
}