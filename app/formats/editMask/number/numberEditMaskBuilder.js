/**
 * Билдер NumberEditMask
 * @constructor
 */
function NumberEditMaskBuilder () {
    this.build = function (builder, parent, metadata) {

        var editMask = new NumberEditMask();
        var formatMetadata = {
            "NumberFormat":{
                "Format": metadata.Mask
            }
        };

        editMask.mask = metadata.Mask;

        editMask.format = builder.buildType(parent, 'NumberFormat', {Format: metadata.Mask});

        return editMask;
    }
}