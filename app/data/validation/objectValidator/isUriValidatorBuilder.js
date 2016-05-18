/**
 * Построитель объекта IsUriValidator.
 *
 * @constructor
 */
function IsUriValidatorBuilder() {
}

IsUriValidatorBuilder.prototype = {

    /**
     * Осуществляет построение объекта проверки данных.
     *
     * @public
     * @param {*} meta Метаданные объекта проверки данных.
     * @param {*} factory Фабрика для построения объектов проверки данных.
     */
    build: function (meta, factory) {
        var result = new IsUriValidator();
        result.message = meta.Message;
        result.property = meta.Property;
        return result;
    }
};