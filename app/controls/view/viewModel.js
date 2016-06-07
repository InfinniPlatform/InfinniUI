var DialogResult = {
    none: 0,
    accepted: 1,
    canceled: 2
};

var ViewModel = ContainerModel.extend({

    defaults: _.defaults({
        dialogResult: DialogResult.none,
        isApplication: false,
        closeButtonVisibility: true
    }, ContainerModel.prototype.defaults),

    initialize: function () {
        ContainerModel.prototype.initialize.apply(this);

        this.set('scripts', new Collection([], 'name'));
        this.set('parameters', new Collection([], 'name'));
        this.set('dataSources', new Collection([], 'name'));
    }
});