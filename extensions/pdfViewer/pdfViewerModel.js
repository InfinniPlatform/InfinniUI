var PdfViewerModel = ControlModel.extend( {

    defaults: _.defaults( {
        width: '100%',
        height: '100%'
    }, ControlModel.prototype.defaults ),

    initialize: function() {
        ControlModel.prototype.initialize.apply( this );
    },

    setWidth: function( width ) {
        this.set( 'width', width );
    },

    getWidth: function() {
        return this.get( 'width' );
    },

    setHeight: function( height ) {
        this.set( 'height', height );
    },

    getHeight: function() {
        return this.get( 'height' );
    }

} );
