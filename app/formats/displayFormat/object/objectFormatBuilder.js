/**
 * @description Билдер ObjectFormat
 * @class ObjectFormatBuilder
 */
function ObjectFormatBuilder () {

    /**
     * @description Создает и инициализирует экземпляр {@link ObjectFormat}
     * @memberOf ObjectFormatBuilder
     * @param context
     * @param args
     * @returns {ObjectFormat}
     */
    this.build = function (context, args) {
        var format = new ObjectFormat();

        format.setFormat(args.metadata.Format);

        return format;
    }
}