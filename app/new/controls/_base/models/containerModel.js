/**
 * @constructor
 * @augments ControlModel
 */
var ContainerModel = ControlModel.extend(
    /** @lends ContainerModel.prototype */
    {
        initialize: function () {
            ControlModel.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
            this.set('items', new Collection());
        },

        fuck: function () {}

    }
);



