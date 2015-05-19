/**
 * Построитель объекта IsContainsCollectionValidator.
 *
 * @constructor
 */
function IsContainsCollectionValidatorBuilder() {
}

IsContainsCollectionValidatorBuilder.prototype = {

    /**
     * Осуществляет построение объекта проверки данных.
     *
     * @public
     * @param {*} meta Метаданные объекта проверки данных.
     * @param {*} factory Фабрика для построения объектов проверки данных.
     */
    build: function (meta, factory) {
        var result = new IsContainsCollectionValidator();
        result.message = meta.Message;
        result.property = meta.Property;
        result.value = meta.Value;
        return result;
    }
};