/**
 * @constructor
 * @augments ContainerModel
 */
var RowModel = ContainerModel.extend( {

    initialize: function() {
        ContainerModel.prototype.initialize.apply( this, Array.prototype.slice.call( arguments ) );
    }

} );

InfinniUI.RowModel = RowModel;
