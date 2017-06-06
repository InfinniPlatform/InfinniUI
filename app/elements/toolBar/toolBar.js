/**
 *
 * @param parent
 * @constructor
 * @augments Container
 */
var ToolBar = function( parent ) {
    _.superClass( ToolBar, this, parent );
};

InfinniUI.ToolBar = ToolBar;

_.inherit( ToolBar, Container );

/**
 *
 * @returns {ToolBarControl}
 */
ToolBar.prototype.createControl = function() {
    return new ToolBarControl();
};
