var PopupButtonControl = function () {
    _.superClass(PopupButtonControl, this);
};

_.inherit(PopupButtonControl, ButtonControl);

_.extend(PopupButtonControl.prototype, {
    createControlModel: function () {
        return new PopupButtonModel();
    },

    createControlView: function (model) {
        return new PopupButtonView({model: model});
    },

    getItems: function () {
        return this.controlModel.get('items');
    },

    getItem: function (name) {
        var item = _.find(this.getItems(), function (data) {
            return data.getName() === name;
        });

        if (typeof item === 'undefined') {
            item = null;
        }
        return item;
    },

    addItem: function(item){
        var items = this.getItems();
        items.push(item);
        this.controlModel.set('items', items);
    },

    removeItem: function (item) {
        var items = this.controlModel.get('items');
        var i = items.indexOf(item);

        if (i > -1) {
            items.splice(i, 1);
            this.controlModel.set('items', items);
        }
    },

    onClick: function(handler){
        if (typeof handler === 'function') {
            this.controlModel.set('useDefaultAction', true);
            this.controlView.on('onClick', handler);
        }
    }


});