var PdfViewerControl = function() {
    _.superClass( PdfViewerControl, this );
};

_.inherit( PdfViewerControl, Control );

_.extend( PdfViewerControl.prototype, {

    createControlModel: function() {
        return new PdfViewerModel();
    },

    createControlView: function( model ) {
        return new PdfViewerView( { model: model } );
    },

    onValueChanged: function( handler ) {
        this.controlModel.on( 'change:value', handler );
    },

    setWidth: function( width ) {
        this.controlModel.setWidth( width );
    },

    getWidth: function() {
        return this.controlModel.getWidth();
    },

    setHeight: function( height ) {
        this.controlModel.setHeight( height );
    },

    getHeight: function() {
        return this.controlModel.getHeight();
    }

} );
