/**
 * @constructor
 * @augments ContainerModel
 */
var StackPanelModel = ContainerModel.extend(
    /** @lends StackPanelModel.prototype */
    {
        initialize: function() {
            ContainerModel.prototype.initialize.apply( this, Array.prototype.slice.call( arguments ) );
        }
    }
);