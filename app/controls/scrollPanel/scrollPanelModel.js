/**
 * @constructor
 * @augments ContainerModel
 */
var ScrollPanelModel = ContainerModel.extend( /** @lends ScrollPanelModel.prototype */ {

    initialize: function() {
        ContainerModel.prototype.initialize.apply( this, Array.prototype.slice.call( arguments ) );
    },

    defaults: _.defaults(
        {
            verticalAlignment: 'Stretch',
            horizontalScroll: InfinniUI.ScrollVisibility.auto,
            verticalScroll: InfinniUI.ScrollVisibility.auto
        },
        ContainerModel.prototype.defaults
    )

} );