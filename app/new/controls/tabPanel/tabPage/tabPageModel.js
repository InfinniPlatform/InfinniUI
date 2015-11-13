/**
 * @constructor
 * @augments ContainerModel
 */
var TabPageModel = ContainerModel.extend(/** @lends TabPageModel.prototype */ {

    initialize: function () {
        ContainerModel.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
    },

    defaults: _.defaults(
        {
            canClose: false
        },
        ContainerModel.prototype.defaults
    )

});