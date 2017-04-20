/**
 *
 * @constructor
 * @augments TextEditorBaseBuilder
 */
function NumericBoxBuilder() {
    _.superClass( NumericBoxBuilder, this );
}

window.InfinniUI.NumericBoxBuilder = NumericBoxBuilder;

_.inherit( NumericBoxBuilder, TextEditorBaseBuilder );

NumericBoxBuilder.prototype.createElement = function( params ) {
    return new NumericBox( params.parent );
};

NumericBoxBuilder.prototype.applyMetadata = function( params ) {
    TextEditorBaseBuilder.prototype.applyMetadata.call( this, params );

    /** @type NumericBox **/
    var element = params.element;
    var metadata = params.metadata;

    element.setMinValue( metadata.MinValue );
    element.setMaxValue( metadata.MaxValue );
    element.setIncrement( metadata.Increment );
    element.setStartValue( metadata.StartValue );
};

