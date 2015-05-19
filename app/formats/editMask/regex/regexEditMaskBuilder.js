/**
 * Билдер RegexEditMask
 * @constructor
 */
function RegexEditMaskBuilder () {

    this.build = function (builder, parent, metadata) {

        var editMask = new RegexEditMask();

        editMask.mask = metadata.Mask;

        return editMask;
    }

}