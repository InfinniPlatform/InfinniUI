( function() {
    var template = InfinniUI.Template[ 'controls/loaderIndicator/template.tpl.html' ];

    InfinniUI.loaderIndicator = {
        show: function() {
            $.blockUI( {
                message: $( template() ),
                ignoreIfBlocked: true,
                baseZ: 99999
            } );
        },
        hide: function() {
            $.unblockUI();
        }
    };

    if( !InfinniUI.config.useLoaderIndicator ) {
        return;
    }

    jQuery( function() {
        var $indicator = $( template() );

        $( 'body' ).append( $indicator );
        $.blockUI.defaults.css = {};
        $( document ).ajaxStart( function() {
            $.blockUI( {
                message: $indicator,
                ignoreIfBlocked: true,
                baseZ: 99999
            } );
        } )
            .ajaxStop( function() {
                $.unblockUI();
            } )
            .ajaxError( function() {
                $.unblockUI();
            } );
    } );

} )();
