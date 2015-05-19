var TabPageModel = ControlModel.extend({

    defaults: _.defaults({
        image: null,
        canClose: false,
        horizontalAlignment: 'Stretch'
    }, ControlModel.prototype.defaults),

    initialize: function(options){
        ControlModel.prototype.initialize.apply(this);
    },

    getId: function () {
        return "TabPage_" + this.cid;
    }

});