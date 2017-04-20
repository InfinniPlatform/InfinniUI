/**
 * @param parent
 * @constructor
 * @augments Container
 */
function TablePanel( parent ) {
    _.superClass( TablePanel, this, parent );
}

window.InfinniUI.TablePanel = TablePanel;

_.inherit( TablePanel, Container );

_.extend( TablePanel.prototype, {
    createControl: function() {
        return new TablePanelControl();
    }
} );
