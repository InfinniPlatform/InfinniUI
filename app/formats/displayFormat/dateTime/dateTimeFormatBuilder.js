/**
 * @description Билдер DateTimeFormat
 * @class DateTimeFormatBuilder
 */
function DateTimeFormatBuilder () {

    /**
     * @description Создает и инициализирует экземпляр {@link DateTimeFormat}
     * @memberOf DateTimeFormatBuilder
     * @param builder
     * @param parent
     * @param metadata
     * @returns {DateTimeFormat}
     */
    this.build = function (builder, parent, metadata) {
        var format = new DateTimeFormat();

        format.setFormat(metadata.Format);

        return format;
    }

}