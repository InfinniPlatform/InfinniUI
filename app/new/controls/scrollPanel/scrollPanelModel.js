/**
 * @constructor
 * @augments ContainerModel
 */
var ScrollPanelModel = ContainerModel.extend(/** @lends ScrollPanelModel.prototype */ {

    initialize: function () {
        ContainerModel.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
    },

    defaults: _.defaults(
        {
            horizontalScroll: ScrollVisibility.auto,
            verticalScroll: ScrollVisibility.auto
        },
        ContainerModel.prototype.defaults
    )

});