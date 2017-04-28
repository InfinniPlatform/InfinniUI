/**
 * @augments Control
 * @constructor
 */
var TooltipControl = function() {
    _.superClass( TooltipControl, this );
};

_.inherit( TooltipControl, Control );

_.extend( TooltipControl.prototype, {

    /**
     * @returns {TooltipModel}
     */
    createControlModel: function(  ) {
        return new TooltipModel();
    },

    /**
     * @returns {TooltipView}
     * @param model
     */
    createControlView: function( model ) {
        return new TooltipView( { model: model } );
    }

} );

InfinniUI.TooltipControl = TooltipControl;
