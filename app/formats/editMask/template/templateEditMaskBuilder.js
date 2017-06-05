/**
 * Билдер TemplateEditMask
 * @constructor
 */
function TemplateEditMaskBuilder() {

    /**
     *
     * @param context
     * @param args
     * @returns {TemplateEditMask}
     */
    this.build = function( context, args ) {
        var editMask = new TemplateEditMask();

        if( typeof args.metadata.Mask !== 'undefined' ) {
            editMask.mask = args.metadata.Mask;
        }
        if( typeof args.metadata.MaskSaveLiteral !== 'undefined' ) {
            editMask.maskSaveLiteral = args.metadata.MaskSaveLiteral;
        }

        if( typeof args.metadata.MaskPlaceHolder !== 'undefined' ) {
            editMask.maskPlaceHolder = args.metadata.MaskPlaceHolder;
        }

        return editMask;
    };

}

InfinniUI.TemplateEditMaskBuilder = TemplateEditMaskBuilder;
