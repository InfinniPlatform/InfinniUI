/**
 * Билдер TemplateEditMask
 * @constructor
 */
function TemplateEditMaskBuilder () {
    this.build = function (builder, parent, metadata) {

        var editMask = new TemplateEditMask();

        if (typeof metadata.Mask !== 'undefined') {
            editMask.mask = metadata.Mask;
        }
        if (typeof metadata.MaskSaveLiteral !== 'undefined') {
            editMask.maskSaveLiteral = metadata.MaskSaveLiteral;
        }

        if (typeof metadata.MaskPlaceHolder !== 'undefined') {
            editMask.maskPlaceHolder = metadata.MaskPlaceHolder;
        }



        return editMask;
    }
}