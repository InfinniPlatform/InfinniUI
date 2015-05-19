/**
 *
 * Построитель объекта AllValidator.
 *
 * @constructor
 */
function AllValidatorBuilder() {
}

AllValidatorBuilder.prototype = {

    /**
     * Осуществляет построение объекта проверки данных.
     *
     * @public
     * @param {*} meta Метаданные объекта проверки данных.
     * @param {*} factory Фабрика для построения объектов проверки данных.
     */
    build: function (meta, factory) {
        var result = new AllValidator();
        result.operator = factory.build(meta.Operator);
        return result;
    }
};