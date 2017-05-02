function fakeView( view ) {
    if ( typeof view === 'undefined' ) {
        view = {};
    }

    view.isView = true;

    view.getContext = function() {
        return {};
    };

    view.getScript = function( name ) {
        return view.scripts[ name ];
    };

    return view;
}

function fakeApplicationView() {
    var view = fakeView();
    var $container = InfinniUI.config.$rootContainer || $( 'body' );
    $container.data( 'view', null );

    view.getApplicationView = function() {
        return this;
    };

    return view;
}
