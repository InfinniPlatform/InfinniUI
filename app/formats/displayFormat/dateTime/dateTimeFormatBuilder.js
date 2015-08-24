/**
 * @description Билдер DateTimeFormat
 * @class DateTimeFormatBuilder
 */
function DateTimeFormatBuilder () {

    /**
     * @description Создает и инициализирует экземпляр {@link DateTimeFormat}
     * @memberOf DateTimeFormatBuilder
     * @param context
     * @param args
     * @returns {DateTimeFormat}
     */
    this.build = function (context, args) {
        var format = new DateTimeFormat();

        format.setFormat(args.metadata.Format);

        return format;
    }

}