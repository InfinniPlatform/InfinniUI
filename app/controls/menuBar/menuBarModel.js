/**
 * @constructor
 * @augments ContainerModel
 */
var MenuBarModel = ContainerModel.extend( {

    /**
     *
     */
    initialize: function() {
        ContainerModel.prototype.initialize.apply( this, Array.prototype.slice.call( arguments ) );
    }

} );

InfinniUI.MenuBarModel = MenuBarModel;
