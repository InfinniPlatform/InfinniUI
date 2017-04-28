var TooltipControl = function() {
    _.superClass( TooltipControl, this );
};

_.inherit( TooltipControl, Control );

_.extend( TooltipControl.prototype, {

    createControlModel: function(  ) {
        return new InfinniUI.TooltipModel();
    },

    createControlView: function( model ) {
        return new InfinniUI.TooltipView( { model: model } );
    }

} );

InfinniUI.TooltipControl = TooltipControl;