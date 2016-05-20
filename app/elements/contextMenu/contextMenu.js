/**
 * @class
 * @constructor
 * @arguments Container
 */
function ContextMenu(parent) {
    _.superClass(ContextMenu, this, parent);
}

_.inherit(ContextMenu, Container);

_.extend(ContextMenu.prototype, {

    createControl: function () {
        return new ContextMenuControl();
    }

});
