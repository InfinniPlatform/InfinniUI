/**
 *
 * @param parent
 * @constructor
 * @augments ContainerControl
 */
function TabPageControl( parent ) {
    _.superClass( TabPageControl, this, parent );
}

_.inherit( TabPageControl, ContainerControl );

_.extend( TabPageControl.prototype, {

    /**
     * @returns {TabPageModel}
     */
    createControlModel: function() {
        return new TabPageModel();
    },

    /**
     * @returns {TabPageView}
     * @param model
     */
    createControlView: function( model ) {
        return new TabPageView( { model: model } );
    }

} );

InfinniUI.TabPageControl = TabPageControl;
