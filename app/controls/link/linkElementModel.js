/**
 * @class
 * @augments ButtonModel
 */
var LinkElementModel = ButtonModel.extend({

    defaults: _.defaults({
        href: "javascript;",
        target: "self"
    }, ButtonModel.prototype.defaults),

    initialize: function () {
        ButtonModel.prototype.initialize.apply(this, arguments);
    }

});
