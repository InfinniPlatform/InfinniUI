/**
 * Билдер NumberEditMask
 * @constructor
 */
function NumberEditMaskBuilder () {
    this.build = function (context, args) {

        var editMask = new NumberEditMask();

        editMask.mask = args.metadata.Mask;

        editMask.format = args.builder.buildType('NumberFormat', {Format: args.metadata.Mask}, {parentView: args.parentView});

        return editMask;
    }
}

window.InfinniUI.NumberEditMaskBuilder = NumberEditMaskBuilder;
