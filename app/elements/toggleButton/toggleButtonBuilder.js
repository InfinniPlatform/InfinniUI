/**
 *
 * @constructor
 * @augments ElementBuilder
 */
function ToggleButtonBuilder() {
    _.superClass( ToggleButtonBuilder, this );
    this.initialize_editorBaseBuilder();
}

window.InfinniUI.ToggleButtonBuilder = ToggleButtonBuilder;

_.inherit( ToggleButtonBuilder, ElementBuilder );


_.extend( ToggleButtonBuilder.prototype, {
    createElement: function( params ) {
        return new ToggleButton( params.parent );
    },

    applyMetadata: function( params ) {
        ElementBuilder.prototype.applyMetadata.call( this, params );
        this.applyMetadata_editorBaseBuilder( params );

        /** @type {ToggleButton} */
        var element = params.element;
        /** @type {ToggleButtonMetadata} */
        var metadata = params.metadata;

        element.setTextOff( metadata.TextOff );
        element.setTextOn( metadata.TextOn );
    }
}, editorBaseBuilderMixin );

/**
 * @typedef {Object} ToggleButtonMetadata
 * @property {String} TextOn
 * @property {String} TextOff
 */
