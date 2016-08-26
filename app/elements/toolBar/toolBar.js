/**
 *
 * @param parent
 * @constructor
 * @augments Container
 */
var ToolBar = function (parent) {
    _.superClass(ToolBar, this, parent);
};

window.InfinniUI.ToolBar = ToolBar;

_.inherit(ToolBar, Container);

ToolBar.prototype.createControl = function () {
    return new ToolBarControl();
};
