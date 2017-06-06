/**
 * @augments Control
 * @constructor
 */
var ViewPanelControl = function() {
    _.superClass( ViewPanelControl, this );
};

_.inherit( ViewPanelControl, Control );

/**
 * @returns {ViewPanelModel}
 */
ViewPanelControl.prototype.createControlModel = function() {
    return new ViewPanelModel();
};

/**
 * @returns {ViewPanelView}
 * @param model
 */
ViewPanelControl.prototype.createControlView = function( model ) {
    return new ViewPanelView( { model: model } );
};

InfinniUI.ViewPanelControl = ViewPanelControl;
