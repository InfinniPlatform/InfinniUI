/**
 * @description Билдер DateTimeFormat
 * @constructor
 */
function DateTimeFormatBuilder() {
    /**
     * @description Создает и инициализирует экземпляр {@link DateTimeFormat}
     * @memberOf DateTimeFormatBuilder
     * @param context
     * @param args
     * @returns {DateTimeFormat}
     */
    this.build = function( context, args ) {
        var format = new DateTimeFormat();

        format.setFormat( args.metadata.Format );

        if( typeof args.metadata.TimeZone === 'number' ) {
            format.setOptions( { TimeZone: args.metadata.TimeZone } );
        }

        return format;
    };
}

InfinniUI.DateTimeFormatBuilder = DateTimeFormatBuilder;
