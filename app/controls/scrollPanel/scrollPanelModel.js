/**
 * @constructor
 * @augments ContainerModel
 */
var ScrollPanelModel = ContainerModel.extend( {

    initialize: function() {
        ContainerModel.prototype.initialize.apply( this, Array.prototype.slice.call( arguments ) );
    },

    defaults: _.defaults( {
        horizontalScroll: InfinniUI.ScrollVisibility.auto,
        verticalScroll: InfinniUI.ScrollVisibility.auto
    }, ContainerModel.prototype.defaults )

} );

InfinniUI.ScrollPanelModel = ScrollPanelModel;
