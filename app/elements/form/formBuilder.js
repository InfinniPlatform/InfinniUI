/**
 *
 * @constructor
 * @augments StackPanelBuilder
 */
function FormBuilder() {
    _.superClass( FormBuilder, this );
}

InfinniUI.FormBuilder = FormBuilder;

_.inherit( FormBuilder, StackPanelBuilder );

_.extend( FormBuilder.prototype, {

    /**
     *
     * @param params
     * @returns {Form}
     */
    createElement: function( params ) {
        return new Form( params.parent );
    },

    /**
     *
     * @param params
     */
    applyMetadata: function( params ) {
        var element = params.element;
        var metadata = params.metadata;
        StackPanelBuilder.prototype.applyMetadata.call( this, params );

        if( metadata.OnSubmit ) {
            var executorBuilderParams = {
                parentView: params.parentView,
                parent: element,
                basePathOfProperty: params.basePathOfProperty
            };
            var onSubmitExecutor = Executor( metadata.OnSubmit, params.builder, executorBuilderParams );
            element.onSubmit( onSubmitExecutor );
        }

        if( metadata.Method ) {
            element.setMethod( metadata.Method );
        }

        if( metadata.Action ) {
            element.setAction( metadata.Action );
        }
    }

} );
