var Tooltip = function( parent ) {
    _.superClass( Icon, this, parent );
};

_.inherit( Tooltip, Element );


_.extend( Tooltip.prototype, {

    createControl: function() {
        return new InfinniUI.TooltipControl();
    },

    setContent: function( content ) {
        this.control.set( 'content', content );
    }


} );


InfinniUI.Tooltip = Tooltip;
