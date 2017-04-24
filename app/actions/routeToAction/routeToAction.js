function RouteToAction() {
    _.superClass( RouteToAction, this );
    this.href = '';
    this.replace = false;
}

_.inherit( RouteToAction, BaseAction );

_.extend( RouteToAction.prototype, {

    execute: function( callback ) {
        var router = InfinniUI.AppRouter;
        var href = this.getHref();
        var replace = this.getReplace();
        var options = {
            trigger: true
        };

        if( replace ) {
            options.replace = true;
        }
        router.navigate( href, options );
    },

    getHref: function() {
        return this.href;
    },

    setHref: function( href ) {
        this.href = href;
    },

    getReplace: function() {
        return this.replace;
    },

    setReplace: function( replace ) {
        if( replace !== undefined ) {
            this.replace = replace;
        }
    }

} );

InfinniUI.RouteToAction = RouteToAction;
