/**
 *
 * @param parent
 * @constructor
 * @augments ContainerControl
 */
function TabPageControl(parent) {
    _.superClass(TabPageControl, this, parent);
}

_.inherit(TabPageControl, ContainerControl);

_.extend(TabPageControl.prototype, /** @lends TabPageControl.prototype */ {


    createControlModel: function () {
        return new TabPageModel();
    },

    createControlView: function (model) {
        return new TabPageView({model: model});
    }


});

