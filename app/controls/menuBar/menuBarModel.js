var MenuBarModel = ControlModel.extend({
    defaults: _.defaults({
        items: null,
        menus: null,
        horizontalAlignment: null,
        verticalAlignment: 'Stretch'
    }, ControlModel.prototype.defaults),

    initialize: function () {
        this.set('items', []);
        ControlModel.prototype.initialize.apply(this);

    },

    setItems: function (items) {
        this.set('items', items);
        //this.trigger('itemsIsChange', this.get('items'));
    },

    getItems: function () {
        return this.get('items');
    }
});