/**
 * @constructor
 * @augments ContainerModel
 */
var CellModel = ContainerModel.extend( {

    defaults: _.defaults( {
        columnSpan: 1
    }, ContainerModel.prototype.defaults ),

    initialize: function() {
        ContainerModel.prototype.initialize.apply( this, Array.prototype.slice.call( arguments ) );
    }

} );

InfinniUI.CellModel = CellModel;
