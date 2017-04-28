/**
 * @constructor
 * @augments ContainerModel
 */
var ScrollPanelModel = ContainerModel.extend( {

    defaults: _.defaults( {
        verticalAlignment: 'Stretch',
        horizontalScroll: InfinniUI.ScrollVisibility.auto,
        verticalScroll: InfinniUI.ScrollVisibility.auto
    }, ContainerModel.prototype.defaults ),

    /**
     *
     */
    initialize: function() {
        ContainerModel.prototype.initialize.apply( this, Array.prototype.slice.call( arguments ) );
    }

} );

InfinniUI.ScrollPanelModel = ScrollPanelModel;
