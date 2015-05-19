var PopupButtonModel = Backbone.Model.extend({
    defaults: _.defaults({
        useDefaultAction: false
    }, ControlModel.prototype.defaults),

    initialize: function () {
        this.set('items', []);
    }
});

