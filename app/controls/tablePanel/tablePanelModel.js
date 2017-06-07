/**
 * @constructor
 * @augments ContainerModel
 */
var TablePanelModel = ContainerModel.extend( {

    /**
     *
     */
    initialize: function() {
        ContainerModel.prototype.initialize.apply( this, Array.prototype.slice.call( arguments ) );
    }

} );

InfinniUI.TablePanelModel = TablePanelModel;
