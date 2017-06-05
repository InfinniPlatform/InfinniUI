/**
 *
 * @param parent
 * @param viewMode
 * @constructor
 * @mixes editorBaseMixin
 * @augments Element
 */
function Label( parent, viewMode ) {
    _.superClass( Label, this, parent, viewMode );
    this.initialize_editorBase();
}

InfinniUI.Label = Label;

_.inherit( Label, Element );

_.extend( Label.prototype, {

    /**
     *
     * @returns {LabelControl}
     */
    createControl: function() {
        return new LabelControl();
    },

    /**
     *
     * @param value
     */
    setTextWrapping: function( value ) {
        if( typeof value === 'boolean' ) {
            this.control.set( 'textWrapping', value );
        }
    },

    /**
     * @returns {*}
     */
    getTextWrapping: function() {
        return this.control.get( 'textWrapping' );
    },

    /**
     *
     * @param value
     */
    setTextTrimming: function( value ) {
        if( typeof value === 'boolean' ) {
            this.control.set( 'textTrimming', value );
        }
    },

    /**
     * @returns {*}
     */
    getTextTrimming: function() {
        return this.control.get( 'textTrimming' );
    },

    /**
     * @returns {*}
     */
    getDisplayFormat: function() {
        return this.control.get( 'displayFormat' );
    },

    /**
     * @param value
     * @returns {*}
     */
    setDisplayFormat: function( value ) {
        return this.control.set( 'displayFormat', value );
    },

    /**
     * @returns {*}
     */
    getDisplayValue: function() {
        return this.control.getDisplayValue();
    },

    /**
     * @description Возвращает режим отображения HTML разметки
     * @returns {Boolean}
     */
    getEscapeHtml: function() {
        return this.control.get( 'escapeHtml' );
    },

    /**
     * @description Устанавливает режим отображения HTML разметки
     * @param {Boolean} value
     */
    setEscapeHtml: function( value ) {
        if( typeof value === 'boolean' ) {
            this.control.set( 'escapeHtml', value );
        }
    }

}, editorBaseMixin );
