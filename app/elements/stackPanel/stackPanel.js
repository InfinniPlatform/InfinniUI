/**
 * @param parent
 * @param viewMode
 * @constructor
 * @augments Container
 */
function StackPanel( parent, viewMode ) {
    _.superClass( StackPanel, this, parent, viewMode );
}

InfinniUI.StackPanel = StackPanel;

_.inherit( StackPanel, Container );

/**
 * @returns {*}
 */
StackPanel.prototype.getOrientation = function() {
    return this.control.get( 'orientation' );
};

/**
 *
 * @param value
 */
StackPanel.prototype.setOrientation = function( value ) {
    if( InfinniUI.Metadata.isValidValue( value, InfinniUI.StackPanelOrientation ) ) {
        this.control.set( 'orientation', value );
    }
};

/**
 *
 * @param viewMode
 * @returns {StackPanelControl}
 */
StackPanel.prototype.createControl = function( viewMode ) {
    return new StackPanelControl( viewMode );
};
