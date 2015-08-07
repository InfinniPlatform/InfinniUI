var ContainerModel = ControlModel.extend({

    initialize: function () {
        ControlModel.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
        this.set('items', new Collection());
    }

});


