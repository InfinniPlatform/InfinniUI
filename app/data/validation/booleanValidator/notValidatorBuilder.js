/**
 * Построитель объекта NotValidator.
 *
 * @constructor
 */
function NotValidatorBuilder() {
}

NotValidatorBuilder.prototype = {

    /**
     * Осуществляет построение объекта проверки данных.
     *
     * @public
     * @param {*} meta Метаданные объекта проверки данных.
     * @param {*} factory Фабрика для построения объектов проверки данных.
     */
    build: function (meta, factory) {
        var result = new NotValidator();
        result.message = meta.Message;
        result.property = meta.Property;
        result.operator = factory.build(meta.Operator);
        return result;
    }
};