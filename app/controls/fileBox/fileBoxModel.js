/**
 * @constructor
 * @augments ControlModel
 * @mixes editorBaseModelMixin
 */
var FileBoxModel = ControlModel.extend( _.extend( {

    defaults: _.defaults( {},
        editorBaseModelMixin.defaults_editorBaseModel,
        ControlModel.prototype.defaults
    ),

    /**
     *
     */
    initialize: function() {
        ControlModel.prototype.initialize.apply( this, arguments );
        this.initialize_editorBaseModel();

        this.set( 'acceptTypes', new Collection() );
        this.on( 'change:file', this.onChangeFileHandler );
        this.on( 'change:value', function( model, value ) {
            if( value instanceof File ) {
                model.set( 'fileName', value.name );
            }
        } );

        this.on( 'invalid', function( model, error ) {
            this.set( 'errorText', error );
        } );
    },

    /**
     *
     * @param attrs
     * @param options
     * @returns {*|string}
     */
    validate: function( attrs, options ) {
        var file = attrs.file;
        var maxSize = this.get( 'maxSize' );
        var acceptTypes = this.get( 'acceptTypes' );

        if( file ) {
            if( maxSize ) {
                if( file.size > maxSize ) {
                    return localized.strings.FileBox.fileSizeTooBig
                        .replace( /\{chosen-size\}/g, ( file.size / ( 1024 * 1024 ) ).toFixed( 1 ) )
                        .replace( /\{permitted-size\}/g, ( maxSize / ( 1024 * 1024 ) ).toFixed( 1 ) );
                }
            }

            if( acceptTypes.length ) {
                var acceptType = acceptTypes.contains( file.type );
                var fileName = file.name.toLowerCase();

                if( !acceptType ) {
                    var len = fileName.length;
                    acceptType = acceptTypes.some( function( name ) {
                        var index = fileName.lastIndexOf( name.toLowerCase() );

                        return index !== -1 && index === len - name.length;
                    } );
                }

                if( !acceptType ) {
                    return localized.strings.FileBox.incorrectFormat;
                }
            }
        }
    },

    /**
     *
     * @param file
     */
    setFile: function( file ) {
        if( this.set( 'file', file, { validate: true } ) ) {
            this.set( 'errorText', '' );
        }
    },

    /**
     *
     */
    removeFile: function() {
        this.setFile( null );
    },

    /**
     *
     * @param model
     * @param file
     */
    onChangeFileHandler: function( model, file ) {
        if( file ) {
            model.set( 'fileName', file.name );
            model.set( 'fileSize', file.size );
        } else {
            model.set( 'fileName', null );
            model.set( 'fileSize', null );
        }
        model.set( 'value', file );
    }

}, editorBaseModelMixin ) );

InfinniUI.FileBoxModel = FileBoxModel;
