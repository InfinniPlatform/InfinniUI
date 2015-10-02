/**
 * @constructor
 * @augments ContainerModel
 */
var TablePanelModel = ContainerModel.extend(
    /** @lends TablePanelModel.prototype */
    {
        initialize: function () {
            ContainerModel.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
        }
    }
);