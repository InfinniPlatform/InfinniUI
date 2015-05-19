/**
 * Билдер DateTimeEditMask
 * @constructor
 */
function DateTimeEditMaskBuilder () {
    this.build = function (builder, parent, metadata) {

        var editMask = new DateTimeEditMask();
        var culture = new Culture(InfinniUI.config.lang);
        var mask;

        if (typeof InfinniUI.localizations[culture.name].patternDateFormats[metadata.Mask] !== 'undefined') {
            mask = InfinniUI.localizations[culture.name].patternDateFormats[metadata.Mask];
        } else {
            mask = metadata.Mask;
        }

        editMask.mask = mask;

        editMask.format = builder.buildType(parent, 'DateTimeFormat', {Format: metadata.Mask});

        return editMask;
    }
}