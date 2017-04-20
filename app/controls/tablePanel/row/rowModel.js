/**
 * @constructor
 * @augments ContainerModel
 */
var RowModel = ContainerModel.extend(
    /** @lends RowModel.prototype */
    {
        initialize: function() {
            ContainerModel.prototype.initialize.apply( this, Array.prototype.slice.call( arguments ) );
        }
    }
);