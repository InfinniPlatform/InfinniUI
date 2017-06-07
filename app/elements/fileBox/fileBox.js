/**
 *
 * @param parent
 * @augments Element
 * @mixes editorBaseMixin
 * @mixes labelTextElementMixin
 * @constructor
 */
function FileBox( parent ) {
    _.superClass( FileBox, this, parent );

    this.initialize_editorBase();
}

InfinniUI.FileBox = FileBox;

_.inherit( FileBox, Element );

_.extend( FileBox.prototype, {

    /**
     * @returns {*}
     */
    getFile: function() {
        return this.control.get( 'file' );
    },

    /**
     *
     * @returns {FileBoxControl}
     */
    createControl: function() {
        return new FileBoxControl();
    },

    /**
     * @description Возвращает максимальный размер данных в байтах
     * @returns {number}
     */
    getMaxSize: function() {
        return this.control.get( 'maxSize' );
    },

    /**
     * @description Устанавливает максимальный размер данных в байтах
     * @param {number} value
     */
    setMaxSize: function( value ) {
        this.control.set( 'maxSize', value );
    },

    /**
     * @description Возвращает коллекцию допустимых форматов данных
     * @returns {Collection}
     */
    getAcceptTypes: function() {
        return this.control.get( 'acceptTypes' );
    },


    /**
     *  Методы, не описанные в документации
     */


    /**
     * @description Недокументированный!
     * @param {Array} types
     */
    setAcceptTypes: function( types ) {
        var collection = this.getAcceptTypes();
        if ( Array.isArray( types ) ) {
            collection.set( types );
        }
    },

    // Недокументированные методы
    /**
     *
     * @param value
     */
    setFile: function( value ) {
        this.control.set( 'file', value );
    },

    /**
     *
     * @param value
     * @returns {FileBox}
     */
    setFileName: function( value ) {
        this.control.set( 'fileName', value );
        return this;
    },

    /**
     *
     * @param value
     * @returns {FileBox}
     */
    setFileSize: function( value ) {
        this.control.set( 'fileSize', value );
        return this;
    },

    /**
     *
     * @param value
     * @returns {FileBox}
     */
    setFileTime: function( value ) {
        this.control.set( 'fileTime', value );
        return this;
    },

    /**
     *
     * @param value
     * @returns {FileBox}
     */
    setFileType: function( value ) {
        this.control.set( 'fileType', value );
        return this;
    }

}, editorBaseMixin, labelTextElementMixin );
