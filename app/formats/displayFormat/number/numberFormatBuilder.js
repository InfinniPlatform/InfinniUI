/**
 * @description Билдер NumberFormat
 * @constructor
 */
function NumberFormatBuilder() {
    /**
     * @description Создает и инициализирует экземпляр {@link NumberFormat}
     * @memberOf NumberFormatBuilder
     * @param context
     * @param args
     * @returns {NumberFormat}
     */
    this.build = function( context, args ) {
        var format = new NumberFormat();

        format.setFormat( args.metadata.Format );

        return format;
    };

}

InfinniUI.NumberFormatBuilder = NumberFormatBuilder;
