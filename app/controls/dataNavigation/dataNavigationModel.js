var DataNavigationModel = ControlModel.extend({
    defaults: _.defaults({
        pageNumber: 0,
        pageSize: 1,
        availablePageSizes: [1]
    }, ControlModel.prototype.defaults),

    initialize: function(){
        ControlModel.prototype.initialize.apply(this);
    }
});