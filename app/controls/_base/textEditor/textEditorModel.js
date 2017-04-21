/**
 * @TODO Если маска заполнена не полностью - не выходить из режима редактирования
 */
var TextEditorModel = Backbone.Model.extend( {

    Mode: {
        Edit: 'edit',
        Display: 'display'
    },

    initialize: function() {
        this.initEditMode();

        this.on( 'change:originalValue', this.onChangeOriginalValueHandler );
        this.on( 'change:value', this.onChangeValueHandler );
        this.on( 'change:mode', this.onChangeModeHandler );
        this.on( 'change:text', this.onChangeTextHandler );
    },

    onChangeTextHandler: function( model, value, options ) {
        var modeStrategy = this.get( 'modeStrategy' );
        modeStrategy.onChangeTextHandler( model, value, options );
    },

    convertValue: function( value ) {
        var getConverter = this.get( 'valueConverter' );
        var converter = getConverter.call( null );
        return ( typeof converter === 'function' ) ? converter.call( this, value ) : value;
    },

    initEditMode: function() {
        this.modeStrategies = {};
        this.modeStrategies[ this.Mode.Edit ] = new TextEditorModelEditModeStrategy();
        this.modeStrategies[ this.Mode.Display ] = new TextEditorModelDisplayModeStrategy();

        this.updateEditModeStrategy();
    },

    defaults: function() {
        return {
            mode: this.Mode.Display
        };
    },

    updateEditModeStrategy: function() {
        var mode = this.get( 'mode' );
        this.set( 'modeStrategy', this.modeStrategies[ mode ] );
    },

    onChangeModeHandler: function( model, mode, options ) {
        var prevMode = this.previous( 'mode' );

        if( options.cancel ) {
            this.cancelChanges();
        } else if( mode === this.Mode.Display && prevMode === this.Mode.Edit ) {
            //При успешном переходе из режима редактирования в режим отображения - обновляем исходное значение
            this.applyChanges();
        }

        this.updateEditModeStrategy();
        this.updateText();
    },

    /**
     *
     * @param {boolean} [cancel = false]
     * @param {boolean} [validate = true]
     */
    setDisplayMode: function( cancel, validate ) {
        cancel = !!cancel;
        validate = ( typeof validate === 'undefined' ) ? true : !!validate;

        this.set( 'mode', this.Mode.Display, {
            cancel: cancel,
            validate: validate
        } );
    },

    applyChanges: function() {
        this.set( 'originalValue', this.get( 'value' ) );
    },

    cancelChanges: function() {
        this.set( 'value', this.get( 'originalValue' ) );
    },

    /**
     *
     * @param text
     * @param {boolean} [ui = false]
     */
    setText: function( text, ui ) {
        var modeStrategy = this.get( 'modeStrategy' );
        modeStrategy.setText( this, text, ui );
    },

    getEditMask: function() {
        return this.get( 'editMask' );
    },

    getValue: function() {
        return this.get( 'value' );
    },

    getDisplayFormat: function() {
        return this.get( 'displayFormat' );
    },

    setEditMode: function() {
        this.set( 'mode', this.Mode.Edit );
    },

    validate: function( attrs, options ) {
        //@TODO Если меняется Mode Edit => Display, проверить введенное значение!!!
        var validateValue = this.get( 'validateValue' );
        var value = this.getValue();

        if( typeof validateValue === 'function' ) {
            return validateValue.call( null, value );
        }
    },

    updateText: function() {
        var modeStrategy = this.get( 'modeStrategy' );
        modeStrategy.updateText( this );
    },

    onChangeValueHandler: function( model, value, options ) {
        if( !options.ui ) {
            this.updateText();
        }
    },

    onChangeOriginalValueHandler: function( model, value ) {
        model.set( 'value', value, { originalValue: true } );
    }

} );
