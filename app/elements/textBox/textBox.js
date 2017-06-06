/**
 *
 * @param parent
 * @constructor
 * @augments TextEditorBase
 */
function TextBox( parent ) {
    _.superClass( TextBox, this, parent );
}

InfinniUI.TextBox = TextBox;

_.inherit( TextBox, TextEditorBase );

_.extend( TextBox.prototype, {

    /**
     *
     * @param parent
     * @returns {TextBoxControl}
     */
    createControl: function( parent ) {
        return new TextBoxControl( parent );
    },

    /**
     * @returns {*}
     */
    getMultiline: function() {
        return this.control.get( 'multiline' );
    },

    /**
     *
     * @param value
     */
    setMultiline: function( value ) {
        this.control.set( 'multiline', value );
    },

    /**
     * @returns {*}
     */
    getLineCount: function() {
        return this.control.get( 'lineCount' );
    },

    /**
     *
     * @param value
     */
    setLineCount: function( value ) {
        this.control.set( 'lineCount', value );
    }

} );


