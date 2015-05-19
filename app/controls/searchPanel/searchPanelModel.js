var SearchPanelModel = ControlModel.extend({
    defaults: _.extend({
        value: null
    }, ControlModel.prototype.defaults),

    initialize: function(){
        ControlModel.prototype.initialize.apply(this);
        this.set({
            text: 'Найти'
        }, {silent: true});
    }
});