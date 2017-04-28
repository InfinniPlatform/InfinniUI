var PdfViewerView = ControlView.extend( {

    className: 'pl-document-viewer',

    template: _.template( '<iframe id="documentViewer" name="documentViewer" style="width:100%;height:100%;" src="./pdf/web/viewer.html#<%= frameId %>"></iframe>' ),

    events: {
        'click .print': 'onButtonPrintClickHandler'
    },

    initialize: function() {
        ControlView.prototype.initialize.apply( this );
        this.listenTo( this.model, 'change:dataSource', this.onChangeDataSource );
    },

    onChangeDataSource: function() {
        if( !this.wasRendered ) {
            return;
        }
        this.renderDocument();
    },

    render: function() {
        this.prerenderingActions();

        this.renderDocument();

        this.postrenderingActions();
        return this;
    },

    renderPdf: function( data ) {
        window.pdfDocs = window.pdfDocs || [];

        var frameId = this.genId();
        window.pdfDocs[ frameId ] = data;
        var template = this.template( { frameId: frameId } );
        this.updateWidth();
        this.updateHeight();
        this.$el.html( template );
    },

    updateWidth: function() {
        this.$el.width( this.model.getWidth() );
    },

    updateHeight: function() {
        this.$el.height( this.model.getHeight() );
    },

    renderDocument: function() {
        var that = this;
        var renderFrame = function() {
            if( this.model.get( 'url' ) ) {
                var url = encodeURI( this.model.get( 'url' ) );
                this.sendRequest( url, function( data ) {
                    that.renderPdf( data );
                } );
            }
        }.bind( this );

        renderFrame();

        this.listenTo( this.model, 'change:url', renderFrame );
    },

    onButtonPrintClickHandler: function() {
        $( '#documentViewer' ).get( 0 ).contentWindow.print();
    },

    genId: function() {
        return Math.round( ( Math.random() * 100000 ) );
    },

    sendRequest: function( url, handler ) {
        var xmlhttp = this.getXmlHttp();

        xmlhttp.open( 'GET', url, true );
        xmlhttp.withCredentials = true;
        xmlhttp.responseType = 'arraybuffer';
        xmlhttp.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
        xmlhttp.onreadystatechange = function() {
            if( xmlhttp.readyState == 4 ) {
                if( xmlhttp.status == 200 ) {
                    handler( xmlhttp.response );
                }
            }
        };
        xmlhttp.send();
    },

    getXmlHttp: function() {
        var xmlhttp;

        try {
            xmlhttp = new ActiveXObject( 'Msxml2.XMLHTTP' );
        } catch( e ) {
            try {
                xmlhttp = new ActiveXObject( 'Microsoft.XMLHTTP' );
            } catch( e1 ) {
                xmlhttp = false;
            }
        }

        if( !xmlhttp && typeof XMLHttpRequest != 'undefined' ) {
            xmlhttp = new XMLHttpRequest();
        }

        return xmlhttp;
    }

} );
