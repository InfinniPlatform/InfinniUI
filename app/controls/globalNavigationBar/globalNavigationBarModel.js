var GlobalNavigationBarModel = ControlModel.extend({

    initialize: function () {
        ControlModel.prototype.initialize.apply(this);
        this.set('applications', []);
    }

});
