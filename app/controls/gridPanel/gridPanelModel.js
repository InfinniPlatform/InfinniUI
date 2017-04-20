/**
 * @constructor
 * @augments ContainerModel
 */
var GridPanelModel = ContainerModel.extend(
    /** @lends GridPanelModel.prototype */
    {
        initialize: function() {
            ContainerModel.prototype.initialize.apply( this, Array.prototype.slice.call( arguments ) );
        }
    }
);