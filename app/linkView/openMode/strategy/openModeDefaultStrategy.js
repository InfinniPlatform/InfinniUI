/**
 * @mixes openModeAutoFocusMixin
 * @constructor
 */
var OpenModeDefaultStrategy = function() {
};

_.extend( OpenModeDefaultStrategy.prototype, {

    /**
     *
     * @param view
     */
    setView: function( view ) {
        this.view = view;
    },

    /**
     *
     */
    open: function() {
        var $container = InfinniUI.config.$rootContainer || $( 'body' );
        var oldView = $container.data( 'view' );

        if( oldView ) {
            oldView.close();
        }

        $container
            .append( this.view.render() )
            .data( 'view', this.view );

        this.applyAutoFocus();
    },

    /**
     *
     */
    close: function() {
        this.view.remove();
    }

}, openModeAutoFocusMixin );

InfinniUI.OpenModeDefaultStrategy = OpenModeDefaultStrategy;
