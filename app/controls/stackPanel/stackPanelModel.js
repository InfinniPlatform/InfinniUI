var StackPanelModel = ControlModel.extend({
    defaults: _.defaults({
        items: null,
        orientation: 'Vertical',
        horizontalAlignment: 'Stretch'
    }, ControlModel.prototype.defaults),

    initialize: function(){
        this.set('items', []);

        ControlModel.prototype.initialize.apply(this);
    },

    addItem: function(item){
        this.get('items').push(item);
        this.trigger('itemsIsChange', this.get('items'));
    },

    getItems: function(){
        return this.get('items');
    }
});