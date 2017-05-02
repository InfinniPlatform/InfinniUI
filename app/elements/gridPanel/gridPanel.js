/**
 * @param parent
 * @constructor
 * @augments Container
 */
function GridPanel( parent ) {
    _.superClass( GridPanel, this, parent );
}

InfinniUI.GridPanel = GridPanel;

_.inherit( GridPanel, Container );

_.extend( GridPanel.prototype, {

    createControl: function() {
        return new GridPanelControl();
    }

} );
