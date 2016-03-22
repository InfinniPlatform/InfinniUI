/**
 * @constructor
 * @augments ControlModel
 */
var ContainerModel = ControlModel.extend(

    /** @lends ContainerModel.prototype */
    {
        defaults: _.defaults({
            //items: new Collection()
            itemTemplate: null
        }, ControlModel.prototype.defaults),

        initialize: function () {
            ControlModel.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
            this.set('items', new Collection());
        }
    }
);



