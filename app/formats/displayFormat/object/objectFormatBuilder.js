/**
 * @description Билдер ObjectFormat
 * @class ObjectFormatBuilder
 */
function ObjectFormatBuilder () {

    /**
     * @description Создает и инициализирует экземпляр {@link ObjectFormat}
     * @memberOf ObjectFormatBuilder
     * @param builder
     * @param parent
     * @param metadata
     * @returns {ObjectFormat}
     */
    this.build = function (builder, parent, metadata) {
        var format = new ObjectFormat();

        format.setFormat(metadata.Format);

        return format;
    }
}