var DocumentViewerModel = ControlModel.extend({
    defaults: _.extend({
    }, ControlModel.prototype.defaults),

    initialize: function(){
        ControlModel.prototype.initialize.apply(this);
    }
});