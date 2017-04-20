/**
 * Билдер DateTimeEditMask
 * @constructor
 */
function DateTimeEditMaskBuilder() {
    this.build = function( context, args ) {
        var formatOptions = args.formatOptions;
        var editMask = new DateTimeEditMask();
        var culture = localized;
        var mask;

        if( typeof InfinniUI.localizations[ culture.name ].patternDateFormats[ args.metadata.Mask ] !== 'undefined' ) {
            mask = InfinniUI.localizations[ culture.name ].patternDateFormats[ args.metadata.Mask ];
        } else {
            mask = args.metadata.Mask;
        }

        editMask.mask = mask;
        editMask.format = args.builder.buildType( 'DateTimeFormat', { Format: args.metadata.Mask }, { parentView: args.parentView } );
        editMask.format.setOptions( formatOptions );

        return editMask;
    };
}

window.InfinniUI.DateTimeEditMaskBuilder = DateTimeEditMaskBuilder;
