/**
 * @constructor
 * @augments ContainerModel
 */
var CellModel = ContainerModel.extend(
    /** @lends CellModel.prototype */
    {
        defaults: _.defaults({
            columnSpan: 1
        }, ContainerModel.prototype.defaults),

        initialize: function () {
            ContainerModel.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
        }
    }
);