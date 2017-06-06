/**
 *
 * @param parent
 * @constructor
 */
function ExtensionPanel( parent ) {
    _.superClass( ExtensionPanel, this, parent );
}

InfinniUI.ExtensionPanel = ExtensionPanel;

_.inherit( ExtensionPanel, Container );

_.extend( ExtensionPanel.prototype, {

    /**
     *
     * @returns {ExtensionPanelControl}
     */
    createControl: function() {
        var control = new ExtensionPanelControl();
        return control;
    },

    /**
     * @returns {*}
     * @param extensionName
     */
    setExtensionName: function( extensionName ) {
        return this.control.set( 'extensionName', extensionName );
    },

    /**
     * @returns {*}
     * @param parameters
     */
    setParameters: function( parameters ) {
        return this.control.set( 'parameters', parameters );
    },

    /**
     * @returns {*}
     */
    getParameters: function() {
        return this.control.get( 'parameters' );
    },

    /**
     *
     * @param context
     */
    setContext: function( context ) {
        this.control.set( 'context', context );
    },

    /**
     *
     * @param builder
     */
    setBuilder: function( builder ) {
        this.control.set( 'builder', builder );
    }

} );
