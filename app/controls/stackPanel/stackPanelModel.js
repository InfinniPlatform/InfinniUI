/**
 * @constructor
 * @augments ContainerModel
 */
var StackPanelModel = ContainerModel.extend( {

    /**
     *
     */
    initialize: function() {
        ContainerModel.prototype.initialize.apply( this, Array.prototype.slice.call( arguments ) );
    }

} );

InfinniUI.StackPanelModel = StackPanelModel;
