/**
 * Построитель объекта NotValidator.
 *
 * @constructor
 */
function IsAbsoluteUriValidatorBuilder() {
}

IsAbsoluteUriValidatorBuilder.prototype = {

    /**
     * Осуществляет построение объекта проверки данных.
     *
     * @public
     * @param {*} meta Метаданные объекта проверки данных.
     * @param {*} factory Фабрика для построения объектов проверки данных.
     */
    build: function (meta, factory) {
        var result = new IsAbsoluteUriValidator();
        result.message = meta.Message;
        result.property = meta.Property;
        return result;
    }
};