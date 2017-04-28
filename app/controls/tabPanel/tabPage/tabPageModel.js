/**
 * @constructor
 * @augments ContainerModel
 */
var TabPageModel = ContainerModel.extend( {

    initialize: function() {
        ContainerModel.prototype.initialize.apply( this, Array.prototype.slice.call( arguments ) );
    },

    defaults: _.defaults(
        {
            canClose: false,
            selected: false
        },
        ContainerModel.prototype.defaults
    )

} );

InfinniUI.TabPageModel = TabPageModel;
