/**
 * @description Билдер NumberFormat
 * @class NumberFormatBuilder
 */
function NumberFormatBuilder () {

    /**
     * @description Создает и инициализирует экземпляр {@link NumberFormat}
     * @memberOf NumberFormatBuilder
     * @param builder
     * @param parent
     * @param metadata
     * @returns {NumberFormat}
     */
    this.build = function (builder, parent, metadata) {
        var format = new NumberFormat();

        format.setFormat(metadata.Format);

        return format;
    }
}