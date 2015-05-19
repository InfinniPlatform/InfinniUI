/**
 * Построитель объекта OrValidator.
 *
 * @constructor
 */
function OrValidatorBuilder() {
}

OrValidatorBuilder.prototype = {

    /**
     * Осуществляет построение объекта проверки данных.
     *
     * @public
     * @param {*} meta Метаданные объекта проверки данных.
     * @param {*} factory Фабрика для построения объектов проверки данных.
     */
    build: function (meta, factory) {
        var result = new OrValidator();
        result.message = meta.Message;
        result.property = meta.Property;

        if (meta.Operators !== null && meta.Operators !== undefined) {
            for (var i = 0; i < meta.Operators.length; ++i) {
                var operator = factory.build(meta.Operators[i]);
                result.operators.push(operator);
            }
        }

        return result;
    }
};