/**
 *
 * @constructor
 * @augments TextEditorBaseBuilder
 */
function NumericBoxBuilder() {
    _.superClass( NumericBoxBuilder, this );
}

InfinniUI.NumericBoxBuilder = NumericBoxBuilder;

_.inherit( NumericBoxBuilder, TextEditorBaseBuilder );

/**
 *
 * @param params
 * @returns {NumericBox}
 */
NumericBoxBuilder.prototype.createElement = function( params ) {
    return new NumericBox( params.parent );
};

/**
 *
 * @param params
 */
NumericBoxBuilder.prototype.applyMetadata = function( params ) {
    TextEditorBaseBuilder.prototype.applyMetadata.call( this, params );

    var element = params.element;
    var metadata = params.metadata;

    element.setMinValue( metadata.MinValue );
    element.setMaxValue( metadata.MaxValue );
    element.setIncrement( metadata.Increment );
    element.setStartValue( metadata.StartValue );

    if( typeof metadata.MinValue !== 'undefined' || typeof metadata.MaxValue !== 'undefined' ) {
        element.setIsNeedValidation( true );
    }
};

