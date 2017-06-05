/**
 * @augments Element
 * @param parent
 * @constructor
 */
var Tooltip = function( parent ) {
    _.superClass( Icon, this, parent );
};

_.inherit( Tooltip, Element );

_.extend( Tooltip.prototype, {

    /**
     *
     * @returns {TooltipControl}
     */
    createControl: function() {
        return new InfinniUI.TooltipControl();
    },

    /**
     *
     * @param content
     */
    setContent: function( content ) {
        this.control.set( 'content', content );
    }

} );

InfinniUI.Tooltip = Tooltip;
