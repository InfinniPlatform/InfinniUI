var DialogResult = {
    none: 0,
    accepted: 1,
    canceled: 2
};

var ViewModel = ContainerModel.extend({

    defaults: _.defaults({
        dialogResult: DialogResult.none
    }, ContainerModel.prototype.defaults),

    initialize: function () {
        ContainerModel.prototype.initialize.apply(this);

        this.set('scripts', new Collection([], 'name'));
        this.set('parameters', new Collection());
        this.set('dataSources', new Collection());
    }
});