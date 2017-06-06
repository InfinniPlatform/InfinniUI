/**
 * @augments ContainerControl
 * @constructor
 */
var ExtensionPanelControl = function() {
    _.superClass( ExtensionPanelControl, this );
};

_.inherit( ExtensionPanelControl, ContainerControl );

_.extend( ExtensionPanelControl.prototype, {

    /**
     * @returns {ExtensionPanelModel}
     */
    createControlModel: function() {
        return new ExtensionPanelModel();
    },

    /**
     *
     * @param model
     * @retunrs {ExtensionPanelView}
     */
    createControlView: function( model ) {
        return new ExtensionPanelView( { model: model } );
    }

} );

InfinniUI.ExtensionPanelControl = ExtensionPanelControl;
