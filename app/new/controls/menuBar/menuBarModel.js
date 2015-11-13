/**
 * @constructor
 * @augments ContainerModel
 */
var MenuBarModel = ContainerModel.extend(
    /** @lends MenuBarModel.prototype */
    {
        initialize: function () {
            ContainerModel.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
        }
    }
);