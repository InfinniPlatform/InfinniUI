/**
 * @constructor
 * @augments ContainerModel
 */
var TabPanelModel = ContainerModel.extend( {

    /**
     *
     */
    initialize: function() {
        ContainerModel.prototype.initialize.apply( this, Array.prototype.slice.call( arguments ) );
    },

    defaults: _.defaults(
        {
            headerLocation: InfinniUI.TabHeaderLocation.top,
            headerOrientation: InfinniUI.TabHeaderOrientation.horizontal
        },
        ContainerModel.prototype.defaults
    )

} );

InfinniUI.TabPanelModel = TabPanelModel;
