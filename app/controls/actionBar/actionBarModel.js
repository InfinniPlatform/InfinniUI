var ActionBarModel = ControlModel.extend({

    initialize: function () {
        this.set('pages', []);
        ControlModel.prototype.initialize.apply(this);
    }

});
