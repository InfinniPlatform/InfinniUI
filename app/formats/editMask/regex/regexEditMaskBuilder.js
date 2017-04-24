/**
 * Билдер RegexEditMask
 * @constructor
 */
function RegexEditMaskBuilder() {

    this.build = function( context, args ) {
        var editMask = new RegexEditMask();

        editMask.mask = args.metadata.Mask;

        return editMask;
    };

}

InfinniUI.RegexEditMaskBuilder = RegexEditMaskBuilder;
