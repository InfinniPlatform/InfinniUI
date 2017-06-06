/**
 *
 * @constructor
 * @augments TextEditorBaseBuilder
 */
function TextBoxBuilder() {
    _.superClass( TextBoxBuilder, this );
}

InfinniUI.TextBoxBuilder = TextBoxBuilder;

_.inherit( TextBoxBuilder, TextEditorBaseBuilder );

/**
 *
 * @param params
 * @returns {TextBox}
 */
TextBoxBuilder.prototype.createElement = function( params ) {
    return new TextBox( params.parent );
};

/**
 *
 * @param params
 */
TextBoxBuilder.prototype.applyMetadata = function( params ) {
    TextEditorBaseBuilder.prototype.applyMetadata.call( this, params );

    var element = params.element;
    var metadata = params.metadata;
    var lineCount = metadata.LineCount;

    element.setMultiline( metadata.Multiline );
    if ( metadata.Multiline && lineCount === null || typeof lineCount === 'undefined' ) {
        lineCount = 2;
    }
    element.setLineCount( lineCount );
};
