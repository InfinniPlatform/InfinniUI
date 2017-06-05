/**
 * @param parent
 * @constructor
 * @augments Container
 */
function TablePanel( parent ) {
    _.superClass( TablePanel, this, parent );
}

InfinniUI.TablePanel = TablePanel;

_.inherit( TablePanel, Container );

_.extend( TablePanel.prototype, {

    /**
     *
     * @returns {TablePanelControl}
     */
    createControl: function() {
        return new TablePanelControl();
    }

} );
