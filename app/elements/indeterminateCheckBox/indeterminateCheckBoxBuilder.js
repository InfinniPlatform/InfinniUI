/**
 *
 * @constructor
 * @augments CheckBoxBuilder
 */
function IndeterminateCheckBoxBuilder() {
    _.superClass( IndeterminateCheckBoxBuilder, this );
    this.initialize_editorBaseBuilder();
}

InfinniUI.IndeterminateCheckBoxBuilder = IndeterminateCheckBoxBuilder;

_.inherit( IndeterminateCheckBoxBuilder, CheckBoxBuilder );

_.extend( IndeterminateCheckBoxBuilder.prototype, {

    /**
     *
     * @param params
     * @returns {IndeterminateCheckBox}
     */
    createElement: function( params ) {
        return new IndeterminateCheckBox( params.parent );
    }

} );

