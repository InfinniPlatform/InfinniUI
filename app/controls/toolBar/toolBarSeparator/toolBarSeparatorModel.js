var ToolBarSeparatorModel = ControlModel.extend({

    defaults: _.defaults({}, ControlModel.prototype.defaults),

    initialize: function () {
        ControlModel.prototype.initialize.apply(this);
    }

});