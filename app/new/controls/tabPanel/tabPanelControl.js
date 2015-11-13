/**
 *
 * @param parent
 * @constructor
 * @augments ContainerControl
 */
function TabPanelControl(parent) {
    _.superClass(TabPanelControl, this, parent);
}

_.inherit(TabPanelControl, ContainerControl);

_.extend(TabPanelControl.prototype, /** @lends TabPanelControl.prototype */ {

    createControlModel: function () {
        return new TabPanelModel();
    },

    createControlView: function (model) {
        return new TabPanelView({model: model});
    }

});

