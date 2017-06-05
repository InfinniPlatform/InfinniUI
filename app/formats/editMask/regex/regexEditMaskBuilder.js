/**
 * Билдер RegexEditMask
 * @constructor
 */
function RegexEditMaskBuilder() {

    /**
     *
     * @param context
     * @param args
     * @returns {RegexEditMask}
     */
    this.build = function( context, args ) {
        var editMask = new RegexEditMask();

        editMask.mask = args.metadata.Mask;

        return editMask;
    };

}

InfinniUI.RegexEditMaskBuilder = RegexEditMaskBuilder;
