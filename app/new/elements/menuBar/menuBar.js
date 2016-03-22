/**
 * @param parent
 * @constructor
 * @augments Container
 */
function MenuBar(parent) {
    _.superClass(MenuBar, this, parent);
}

_.inherit(MenuBar, Container);

_.extend(MenuBar.prototype, {
    createControl: function (viewMode) {
        return new MenuBarControl(viewMode);
    }
});