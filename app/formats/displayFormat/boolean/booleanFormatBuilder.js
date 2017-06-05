/**
 * @description Билдер BooleanFormat
 * @constructor
 */
function BooleanFormatBuilder() {
    /**
     * @description Создает и инициализирует экземпляр {@link BooleanFormat}
     * @memberOf BooleanFormatBuilder
     * @instance
     * @param context
     * @param args
     * @returns {BooleanFormat}
     */
    this.build = function( context, args ) {
        var format = new BooleanFormat();

        format.setFalseText( args.metadata.FalseText );
        format.setTrueText( args.metadata.TrueText );

        return format;
    };
}

InfinniUI.BooleanFormatBuilder = BooleanFormatBuilder;
