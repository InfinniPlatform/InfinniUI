/**
 *
 * @param parent
 * @constructor
 * @augments Element
 * @mixes editorBaseMixin
 * @mixes labelTextElementMixin
 */
function TextEditorBase( parent ) {
    _.superClass( TextEditorBase, this, parent );
    this.initialize_editorBase();
}

InfinniUI.TextEditorBase = TextEditorBase;

_.inherit( TextEditorBase, Element );

_.extend( TextEditorBase.prototype, {

    /**
     *
     * @param editor
     */
    setEditor: function( editor ) {
        this.control.set( 'editor', editor );
    },

    /**
     *
     * @param value
     */
    setDisplayFormat: function( value ) {
        this.control.set( 'displayFormat', value );
    },

    /**
     * @returns {*}
     */
    getDisplayFormat: function() {
        return this.control.get( 'displayFormat' );
    },

    /**
     *
     * @param value
     */
    setEditMask: function( value ) {
        this.control.set( 'editMask', value );
    },

    /**
     * @returns {*}
     */
    getEditMask: function() {
        return this.control.get( 'editMask' );
    },

    /**
     * @description Возвращает значение, которое введено в поле редактирования в данный момент
     * @returns {*}
     */
    getRawValue: function() {
        var value = this.control.get( 'editor' ).getValue();
        var editMask = this.getEditMask();

        if ( editMask ) {
            var val = editMask.getValue();
            var txt = editMask.getText();

            if ( isNotEmpty( val ) ) {
                value = val;
            } else if ( isNotEmpty( txt ) ) {
                value = txt;
            }
        }

        return value;

        function isNotEmpty( val ) {
            return val !== null && typeof val !== 'undefined';
        }
    },

    /**
     * @returns {*}
     */
    getInputType: function() {
        return this.control.get( 'inputType' );
    },

    /**
     *
     * @param inputType
     */
    setInputType: function( inputType ) {
        if ( inputType ) {
            this.control.set( 'inputType', inputType );
        }
    }

}, editorBaseMixin, labelTextElementMixin );
