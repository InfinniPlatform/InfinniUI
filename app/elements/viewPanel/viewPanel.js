/**
 *
 * @param parent
 * @constructor
 * @augments Element
 */
function ViewPanel( parent ) {
    _.superClass( ViewPanel, this, parent );
}

InfinniUI.ViewPanel = ViewPanel;

_.inherit( ViewPanel, Element );

_.extend( ViewPanel.prototype, {

    /**
     *
     * @param layout
     */
    setLayout: function( layout ) {
        var oldLayout = this.getLayout();

        if( oldLayout ) {
            oldLayout.close();
        }

        this.control.set( 'layout', layout );
    },

    /**
     * @returns {*}
     */
    getLayout: function() {
        return this.control.get( 'layout' );
    },

    /**
     *
     * @returns {ViewPanelControl}
     */
    createControl: function() {
        return new ViewPanelControl();
    }

} );
