/**
 * @description Билдер BooleanFormat
 * @class BooleanFormatBuilder
 */
function BooleanFormatBuilder () {

    /**
     * @description Создает и инициализирует экземпляр {@link BooleanFormat}
     * @memberOf BooleanFormatBuilder
     * @instance
     * @param builder
     * @param parent
     * @param metadata
     * @returns {BooleanFormat}
     */
    this.build = function (builder, parent, metadata) {

        var format = new BooleanFormat();

        format.setFalseText(metadata.FalseText);
        format.setTrueText(metadata.TrueText);

        return format;
    }
}