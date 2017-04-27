/**
 *
 * @constructor
 */
function RouteToAction() {
    _.superClass( RouteToAction, this );
    this.href = '';
    this.replace = false;
}

_.inherit( RouteToAction, BaseAction );

_.extend( RouteToAction.prototype, {

    /**
     *
     * @param callback
     */
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

    /**
     *
     * @returns {string}
     */
    getHref: function() {
        return this.href;
    },

    /**
     *
     * @param {string} href
     */
    setHref: function( href ) {
        this.href = href;
    },

    /**
     *
     * @returns {boolean}
     */
    getReplace: function() {
        return this.replace;
    },

    /**
     *
     * @param {boolean} replace
     */
    setReplace: function( replace ) {
        if( typeof replace === 'boolean' ) {
            this.replace = replace;
        }
    }

} );

InfinniUI.RouteToAction = RouteToAction;
