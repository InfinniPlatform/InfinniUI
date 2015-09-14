var DialogResult = {
    none: 0,
    accepted: 1,
    canceled: 2
};

var ViewModel = ControlModel.extend({

    defaults: _.defaults({
        dialogResult: DialogResult.none
    }, ControlModel.prototype.defaults),

    initialize: function () {
        ControlModel.prototype.initialize.apply(this);

        this.set('scripts', new Collection([], 'name'));
        this.set('parameters', new Collection());
        this.set('dataSources', new Collection());
    }
});