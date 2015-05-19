/**
 *
 * Построитель объекта AnyValidator.
 *
 * @constructor
 */
function AnyValidatorBuilder() {
}

AnyValidatorBuilder.prototype = {

    /**
     * Осуществляет построение объекта проверки данных.
     *
     * @public
     * @param {*} meta Метаданные объекта проверки данных.
     * @param {*} factory Фабрика для построения объектов проверки данных.
     */
    build: function (meta, factory) {
        var result = new AnyValidator();
        result.operator = factory.build(meta.Operator);
        return result;
    }
};