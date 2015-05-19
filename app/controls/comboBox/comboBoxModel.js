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
        showClear: true
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
    }

});