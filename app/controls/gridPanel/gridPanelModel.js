/**
 * @constructor
 * @augments ContainerModel
 */
var GridPanelModel = ContainerModel.extend( {

    initialize: function() {
        ContainerModel.prototype.initialize.apply( this, Array.prototype.slice.call( arguments ) );
    }

} );

InfinniUI.GridPanelModel = GridPanelModel;
