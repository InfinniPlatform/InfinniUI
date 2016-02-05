var QueryFilter = function (listCriteria, bindingBuilder) {
    this._bindingBuilder = bindingBuilder;
    this._criteriaList = [];
    this._bindings = [];
    this.setCriteria(listCriteria);
};

_.extend(QueryFilter.prototype, {

    clean: function () {
        if (this._criteriaList.length === 0) {
            return;
        }
        this.stopListening();
        this.off();
        this._criteriaList.length = 0;
        this._bindings.length = 0;
    },

    appendCriteria: function (itemCriteria, silent) {
        var criteria = new CriteriaItem();
        criteria.property = ('Property' in itemCriteria) ? itemCriteria.Property : itemCriteria.property;
        criteria.criteriaType = ('CriteriaType' in itemCriteria) ? itemCriteria.CriteriaType : itemCriteria.criteriaType;

        var value = ('Value' in itemCriteria) ? itemCriteria.Value : itemCriteria.value;
        if (value !== null && typeof value === 'object' && !Array.isArray(value) && value.constructor !== Date) {
            //Объект не массив и не дата = DataBinding
            this.bindToValue(criteria, value);
        } else {
            criteria.value = value;
        }
        this.listenTo(criteria, 'change', function () {
            this.triggerOnChange();
        });
        this._criteriaList.push(criteria);

        if (silent !== true) {
            this.triggerOnChange();
        }
        return criteria;
    },

    setCriteria: function (list) {
        this.clean();

        this._list = list;

        if (Array.isArray(list)) {
            list.forEach(function (item) {
                this.appendCriteria(item, true);
            }, this);
        }
        this.triggerOnChange();
    },

    triggerOnChange: function () {
        this.trigger('change', this.getCriteriaList());
    },

    getCriteriaList: function () {
        return this._criteriaList.map(function (CriteriaItem) {
            return CriteriaItem.toJSON();
        });
    },

    isReady: function () {
        return this._bindings.every(function (binding) {
            var source = binding.getSource();
            return 'isReady' in source && source.isReady();
        });
    },

    bindToValue: function(criteria, valueMetadata){
        var binding = this._bindingBuilder(valueMetadata);
        var that = this;

        binding.bindElement({

            setProperty: function(propName, propValue){
                criteria.value = propValue;
            },

            onPropertyChanged: function(){}
        });

        this._bindings.push(binding);
    },

    onChange: function (handler) {
        this.on('change', handler);
    }
});

_.extend(QueryFilter.prototype, Backbone.Events);
