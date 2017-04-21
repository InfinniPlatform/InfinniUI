function PdfViewer( parentView ) {
    _.superClass( PdfViewer, this, parentView );
}

_.inherit( PdfViewer, Element );

_.extend( PdfViewer.prototype, {

    createControl: function() {
        return new PdfViewerControl();
    },

    setUrl: function( url ) {
        return this.control.set( 'url', url );
    },

    setWidth: function( width ) {
        this.control.setWidth( width );
    },

    getWidth: function() {
        return this.control.getWidth();
    },

    setHeight: function( height ) {
        this.control.setHeight( height );
    },

    getHeight: function() {
        return this.control.getHeight();
    }

}, valuePropertyMixin );
