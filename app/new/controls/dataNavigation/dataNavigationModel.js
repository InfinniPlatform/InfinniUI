var DataNavigationModel = ControlModel.extend({

    defaults: _.defaults({
            _buttonsCount: 5,
            _buttonsTemplate: ['prev', 'page', 'next']
        },
        ControlModel.prototype.defaults
    ),

    initialize: function () {
        ControlModel.prototype.initialize.apply(this, arguments);
        this.set('availablePageSizes', new Collection());
    }
});