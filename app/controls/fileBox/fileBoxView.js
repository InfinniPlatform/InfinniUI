/**
 * @augments ControlView
 * @mixes editorBaseViewMixin
 * @constructor
 */
var FileBoxView = ControlView.extend( /** @lends FileBoxView.prototype */ _.extend( {}, editorBaseViewMixin, {

    template: InfinniUI.Template[ 'controls/fileBox/template/template.tpl.html' ],

    className: 'pl-file-box',

    UI: _.extend( {}, editorBaseViewMixin.UI, {
        label: '.pl-control-label',
        btnRemove: '.pl-filebox-btn-remove',
        btnPick: '.pl-filebox-btn-pick',
        fileEmpty: '.pl-filebox-file-empty',
        fileUpload: '.pl-filebox-file-upload',
        fileDownload: '.pl-filebox-file-download',
        fileDownloadUrl: '.pl-filebox-file-download-url',
        edit: '.pl-filebox-edit',
        control: '.form-control',
        input: 'input'
    } ),

    events: {
        'change input': 'onChangeFileHandler',
        'click .pl-filebox-btn-remove': 'onClickRemoveImageHandler'
    },

    initHandlersForProperties: function() {
        ControlView.prototype.initHandlersForProperties.call( this );
        this.listenTo( this.model, 'change:labelText', this.updateLabelText );
        this.listenTo( this.model, 'change:fileName', this.updateFileName );
        this.listenTo( this.model, 'change:fileSize', this.updateFileSize );
        this.listenTo( this.model, 'change:fileTime', this.updateFileTime );
        this.listenTo( this.model, 'change:fileType', this.updateFileType );
        this.listenTo( this.model, 'change:value', this.updateValue );

        this.listenTo( this.model, 'change:hintText', this.updateHintText );
        this.listenTo( this.model, 'change:errorText', this.updateErrorText );
        this.listenTo( this.model, 'change:warningText', this.updateWarningText );

        this.listenTo( this.model, 'invalid', this.onInvalidHandler );

        var acceptTypes = this.model.get( 'acceptTypes' );
        acceptTypes.onChange( this.updateAcceptTypes.bind( this ) );
    },

    updateProperties: function() {
        ControlView.prototype.updateProperties.call( this );

        this.updateLabelText();
        this.updateFileName();
        this.updateFileSize();
        this.updateFileType();
        this.updateFileTime();
        this.updateAcceptTypes();
        this.updateValue();

        this.updateHintText();
        this.updateErrorText();
        this.updateWarningText();
    },

    updateLabelText: function() {
        var labelText = this.model.get( 'labelText' );

        if( labelText != '' ) {
            this.ui.label
                .css( { display: 'inline-block' } )
                .text( labelText );
        } else {
            this.ui.label.css( { display: 'none' } );
        }
    },

    updateAcceptTypes: function() {
        var acceptTypes = this.model.get( 'acceptTypes' );
        if( acceptTypes.length === 0 ) {
            this.ui.input.removeAttr( 'accept' );
        } else {
            var accept = acceptTypes.toArray().join( ',' );
            this.ui.input.attr( 'accept', accept );
        }
    },

    updateFocusable: function() {
        var focusable = this.model.get( 'focusable' );

        if( focusable ) {
            this.ui.control.attr( 'tabindex', 0 );
        } else {
            this.ui.control.removeAttr( 'tabindex' );
        }
    },

    updateText: function() {
        var text = this.model.get( 'text' );

        this.ui.btnPick.attr( 'title', text );
    },

    updateHintText: function() {
        var hintText = this.model.get( 'hintText' );

        if( hintText ) {
            this.ui.hintText
                .text( hintText )
                .removeClass( 'hidden' );
        } else {
            this.ui.hintText
                .text( '' )
                .addClass( 'hidden' );
        }
    },

    updateErrorText: function() {
        var errorText = this.model.get( 'errorText' );

        if( errorText ) {
            this.ui.errorText
                .text( errorText )
                .removeClass( 'hidden' );
        } else {
            this.ui.errorText
                .text( '' )
                .addClass( 'hidden' );
        }
    },

    updateWarningText: function() {
        var warningText = this.model.get( 'warningText' );

        if( warningText ) {
            this.ui.warningText
                .text( warningText )
                .removeClass( 'hidden' );
        } else {
            this.ui.warningText
                .text( '' )
                .addClass( 'hidden' );
        }

    },

    updateEnabled: function() {
        ControlView.prototype.updateEnabled.call( this );

        var isEnabled = this.model.get( 'enabled' );

        this.ui.input.prop( 'disabled', !isEnabled );
        this.ui.btnRemove.prop( 'disabled', !isEnabled );
        this.ui.btnPick.toggleClass( 'disabled', !isEnabled );

    },

    updateFileName: function() {
        var fileName = this.model.get( 'fileName' );

        this.ui.fileUpload.text( fileName );
        this.ui.fileDownloadUrl.text( fileName );
    },

    updateFileSize: function() {
    },

    updateFileInfo: function() {
        return;
    },

    updateFileTime: function() {
        // var time = this.model.get( 'fileTime' );
        //@TODO Update file's datetime on view
    },

    updateFileType: function() {
        // var fileType = this.model.get( 'fileType' );
        //@TODO Update file's mime type on view
    },

    updateValue: function() {
        var model = this.model;
        var value = model.get( 'value' );
        var fileEmpty = false;
        var fileUpload = false;
        var fileDownload = false;

        if( value === null || typeof value === 'undefined' ) {
            //No file
            fileEmpty = value === null || typeof value === 'undefined';
            this.ui.input.val( null );
            this.updateUrl( null );
        } else if( value && typeof value === 'object' ) {
            //File instance
            fileUpload = value && typeof value === 'object';
            this.updateUrl( null );
        } else {
            //Url
            fileDownload = true;
            this.updateUrl( value );
        }

        this.ui.fileEmpty.toggleClass( 'hidden', !fileEmpty );
        this.ui.fileUpload.toggleClass( 'hidden', !fileUpload );
        this.ui.fileDownload.toggleClass( 'hidden', !fileDownload );

        this.ui.btnRemove.toggleClass( 'hidden', fileEmpty );
        this.ui.btnPick.toggleClass( 'hidden', !fileEmpty );
    },

    updateUrl: function( url ) {
        this.ui.fileDownloadUrl.attr( 'href', url );
        var none = url === null || typeof url === 'undefined';
        this.$el.toggleClass( 'pl-empty', none );
        this.updateFileInfo();
    },

    onClickRemoveImageHandler: function() {
        this.model.removeFile();
        this.ui.input.val( '' );
    },

    onChangeFileHandler: function() {
        var file = null;
        var files = this.ui.input[ 0 ].files;

        if( files && files[ 0 ] ) {
            file = files[ 0 ];
        }
        this.model.setFile( file );
    },

    render: function() {
        this.prerenderingActions();

        this.renderTemplate( this.template );
        this.updateProperties();

        this.trigger( 'render' );

        this.postrenderingActions();

        //devblockstart
        InfinniUI.global.messageBus.send( 'render', { element: this } );
        //devblockstop

        return this;
    },

    onInvalidHandler: function() {
        this.ui.input.val( null );
    }

} ) );

InfinniUI.FileBoxView = FileBoxView;
