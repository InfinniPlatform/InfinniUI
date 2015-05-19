var ToolBarModel = ControlModel.extend({
    defaults: _.defaults({
        items: null
    }, ControlModel.prototype.defaults),

    initialize: function () {
        this.set('items', []);
        ControlModel.prototype.initialize.apply(this);
    },

    addItem: function (item) {
        this.get('items').push(item);
    },

    setItems: function (items){
        this.set('items', items);
    },

    getItems: function () {
        return this.get('items');
    }
});