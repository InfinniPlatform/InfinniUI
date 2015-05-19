var ComboBoxModel = ControlModel.extend({

    defaults: _.extend({
        text: null,
        showPopup: true,
        showSelect: false,
        autocomplete: 'none',
        multiSelect: false,
        readOnly: false,
        //term: '',    //Строка поиска
        displayProperty: 'DisplayName',
        selectView: false,
        itemFormat: null,
        showClear: true,
        item: null
    }, ControlModel.prototype.defaults),

    initialize: function () {
        ControlModel.prototype.initialize.apply(this);
        this.set('items', []);
        this.set('term', '');
        this.list = {};//{id, text} для select2.iniSelection
        //Значение по умолчанию для DisplayProperty
        this.on('change:displayProperty', function (model, value) {
            if (typeof value === 'undefined' || value === null || value === '') {
                this.set('displayProperty', 'DisplayName', {silent: true});
            }
        });

        this.on('change:value', this.updateItemHandler);
        this.on('change:items', this.updateItemHandler);
    },

    updateItemHandler: function () {
        var item = null;
        var items = this.get('items');
        var value = this.get('value');

        if (!_.isEmpty(value) && _.isArray(items)) {
            var method = _.isArray(value) ? 'where' : 'findWhere';

            item = _[method].call(_, items, {Id: value.Id});

            if (typeof item === 'undefined') {
                item = null;
            }
        }

        this.set('item', item);
    }
});