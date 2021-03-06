/**
 *
 * @param $target
 */
InfinniUI.openHomePage = function( $target ) {
    var builder = new ApplicationBuilder();
    var rootView = new SpecialApplicationView();

    InfinniUI.localStorageDataSource = new InfinniUI.LocalStorageDataSource( {
        view: rootView
    } );

    rootView.open( $target );

    InfinniUI.AutoHeightService.slidingRecalculation( $target );
    subscribeRecalculationOnWindowResize( $target );

    getHomePageLinkViewPromise()
        .done( function( viewMetadata ) {
            var action = builder.buildType( 'OpenAction', viewMetadata, { parentView: rootView } );
            action.execute();
        } );
};

/**
 *
 * @param $container
 */
function subscribeRecalculationOnWindowResize( $container ) {
    var TIMEOUT = 40;
    var WAIT = 50;
    var resizeTimeout;

    $( window ).resize( function() {
        clearTimeout( resizeTimeout );
        resizeTimeout = setTimeout( _.debounce( onWindowResize, WAIT ), TIMEOUT );
    } );

    function onWindowResize() {
        InfinniUI.AutoHeightService.recalculation( $container );
    }
}

/**
 * @returns {*}
 */
function getHomePageLinkViewPromise() {
    var defer = $.Deferred();
    var homePageMetadata = InfinniUI.config.homePage;

    if( typeof homePageMetadata === 'string' ) {
        $.ajax( {
            url: homePageMetadata,
            dataType: 'json'
        } )
            .then( function( data ) {
                defer.resolve( {
                    LinkView: {
                        InlineView: {
                            View: data
                        }
                    }
                } );
            }, function( jqXHR, textStatus, errorThrown ) {
                console.error( textStatus );
            } );
    } else {
        defer.resolve( {
            LinkView: {
                AutoView: homePageMetadata
            }
        } );
    }

    return defer.promise();
}
