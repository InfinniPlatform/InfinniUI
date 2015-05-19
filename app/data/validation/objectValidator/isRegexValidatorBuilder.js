/**
 * Построитель объекта IsRegexValidator.
 *
 * @constructor
 */
function IsRegexValidatorBuilder() {
}

IsRegexValidatorBuilder.prototype = {

    /**
     * Осуществляет построение объекта проверки данных.
     *
     * @public
     * @param {*} meta Метаданные объекта проверки данных.
     * @param {*} factory Фабрика для построения объектов проверки данных.
     */
    build: function (meta, factory) {
        var result = new IsRegexValidator();
        result.message = meta.Message;
        result.property = meta.Property;
        result.pattern = meta.Pattern;
        return result;
    }
};