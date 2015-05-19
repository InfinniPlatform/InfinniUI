/**
 * Фабрика для построения объектов проверки данных.
 *
 * @constructor
 */
function ValidationBuilderFactory() {
}

ValidationBuilderFactory.prototype = {

    builders: [],

    /**
     * Регистрирует построитель.
     *
     * @public
     * @param {string} type Тип объекта проверки данных.
     * @param {*} builder Построитель объекта проверки данных.
     */
    register: function (type, builder) {
        this.builders[type] = builder;
    },

    /**
     * Регистрирует построитель.
     *
     * @public
     * @param {*} meta Метаданные объекта проверки данных.
     * @return {*} Объект проверки данных.
     */
    build: function (meta) {

        // Определяем тип объекта проверки данных
        var type = (Object.keys(meta)[0]);

        if (type === "null" || type === "undefined") {
            return null;
        }

        // Ищем подходящий построитель для типа
        var builder = this.builders[type];

        if (type === "null" || type === "undefined") {
            return null;
        }

        // Осуществляем построение объекта
        return builder.build(meta[type], this);
    }
};


/**
 * Создает фабрику для построения объектов проверки данных.
 *
 * @public
 * @return {*} Фабрика для построения объектов проверки данных.
 */
function createValidationBuilderFactory() {
    var factory = new ValidationBuilderFactory();

    // BooleanValidator
    factory.register("False", new FalseValidatorBuilder());
    factory.register("True", new TrueValidatorBuilder());
    factory.register("Not", new NotValidatorBuilder());
    factory.register("And", new AndValidatorBuilder());
    factory.register("Or", new OrValidatorBuilder());

    // CollectionValidator
    factory.register("Any", new AnyValidatorBuilder());
    factory.register("All", new AllValidatorBuilder());
    factory.register("IsNullOrEmptyCollection", new IsNullOrEmptyCollectionValidatorBuilder());
    factory.register("IsContainsCollection", new IsContainsCollectionValidatorBuilder());

    // ObjectValidator
    factory.register("IsNull", new IsNullValidatorBuilder());
    factory.register("IsEqual", new IsEqualValidatorBuilder());
    factory.register("IsDefaultValue", new IsDefaultValueValidatorBuilder());
    factory.register("IsGuid", new IsGuidValidatorBuilder());
    factory.register("IsUri", new IsUriValidatorBuilder());
    factory.register("IsAbsoluteUri", new IsAbsoluteUriValidatorBuilder());
    factory.register("IsRelativeUri", new IsRelativeUriValidatorBuilder());
    factory.register("IsNullOrEmpty", new IsNullOrEmptyValidatorBuilder());
    factory.register("IsNullOrWhiteSpace", new IsNullOrWhiteSpaceValidatorBuilder());
    factory.register("IsContains", new IsContainsValidatorBuilder());
    factory.register("IsStartsWith", new IsStartsWithValidatorBuilder());
    factory.register("IsEndsWith", new IsEndsWithValidatorBuilder());
    factory.register("IsRegex", new IsRegexValidatorBuilder());
    factory.register("IsLessThan", new IsLessThanValidatorBuilder());
    factory.register("IsMoreThan", new IsMoreThanValidatorBuilder());
    factory.register("IsMoreThanOrEqual", new IsMoreThanOrEqualValidatorBuilder());
    factory.register("IsLessThanOrEqual", new IsLessThanOrEqualValidatorBuilder());
    factory.register("IsIn", new IsInValidatorBuilder());

    return factory;
}