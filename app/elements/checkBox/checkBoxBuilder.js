/**
 *
 * @constructor
 * @augments ElementBuilder
 * @mixes editorBaseBuilderMixin
 */
function CheckBoxBuilder() {
    _.superClass( CheckBoxBuilder, this );
    this.initialize_editorBaseBuilder();
}

InfinniUI.CheckBoxBuilder = CheckBoxBuilder;

_.inherit( CheckBoxBuilder, ElementBuilder );

_.extend( CheckBoxBuilder.prototype, {

    /**
     *
     * @param params
     * @returns {CheckBox}
     */
    createElement: function( params ) {
        return new CheckBox( params.parent );
    },

    /**
     *
     * @param params
     */
    applyMetadata: function( params ) {
        ElementBuilder.prototype.applyMetadata.call( this, params );
        this.applyMetadata_editorBaseBuilder( params );
    }

}, editorBaseBuilderMixin );

