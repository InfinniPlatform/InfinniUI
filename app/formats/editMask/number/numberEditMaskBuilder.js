/**
 * Билдер NumberEditMask
 * @constructor
 */
function NumberEditMaskBuilder () {
    this.build = function (context, args) {

        var editMask = new NumberEditMask();

        editMask.mask = args.metadata.Mask;

        editMask.format = args.builder.buildType(args.view, 'NumberFormat', {Format: args.metadata.Mask});

        return editMask;
    }
}