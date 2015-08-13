/**
 *
 * @constructor
 * @augments ElementBuilder
 */
function ToggleButtonBuilder() {
    _.superClass(ToggleButtonBuilder, this);
    editorBaseBuilderMixin.call(this);
}

_.inherit(ToggleButtonBuilder, ElementBuilder);

ToggleButtonBuilder.prototype.createElement = function (params) {
    return new ToggleButton(params.parent);
};

ToggleButtonBuilder.prototype.applyMetadata = function (params) {
    ElementBuilder.prototype.applyMetadata.call(this, params);
    editorBaseBuilderMixin.applyMetadata.call(this, params);

    /** @type {ToggleButton} */
    var element = params.element;
    /** @type {ToggleButtonMetadata} */
    var metadata = params.metadata;

    element.setTextOff(metadata.TextOff);
    element.setTextOn(metadata.TextOn);
};

/**
 * @typedef {Object} ToggleButtonMetadata
 * @property {String} TextOn
 * @property {String} TextOff
 */
