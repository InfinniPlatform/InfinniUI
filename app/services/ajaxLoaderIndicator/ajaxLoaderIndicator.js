var AjaxLoaderIndicator = function( $target, config ) {
    var defaults = {
        delay: 50
    };

    var options = _.defaults( {}, config, defaults );

    var model = new AjaxLoaderIndicatorModel( {}, options );
    var ajaxLoaderIndicator = new AjaxLoaderIndicatorView( { model: model } );


    var $indicator = ajaxLoaderIndicator.render().$el;
    $target.append( $indicator );
};

