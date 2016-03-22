/**
 * @constructor
 * @augments ContainerModel
 */
var TabPanelModel = ContainerModel.extend(/** @lends TabPanelModel.prototype */ {

    initialize: function () {
        ContainerModel.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
    },

    defaults: _.defaults(
        {
            headerLocation: TabHeaderLocation.top,
            headerOrientation: TabHeaderOrientation.horizontal
        },
        ContainerModel.prototype.defaults
    )

});