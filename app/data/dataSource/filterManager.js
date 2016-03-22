var FilterManager = function (bindingBuilder) {
    this._bindingBuilder = bindingBuilder;
    this._criteriaList = [];
    this._bindings = [];
};

_.extend(FilterManager.prototype, {

    clean: function () {
        this.off();
        this._criteriaList.length = 0;
        this._bindings.length = 0;
    },

    addFilter: function (filterList) {
        var startCriteriaIndex = this._criteriaList.length;
        var index;
        var binding;

        filterList.forEach(function (filter, i) {

            index = startCriteriaIndex + i;

            this._criteriaList.push(filter);

            if('Value' in filter && $.isPlainObject(filter['Value'])){
                binding = this.bindToValue(filter['Value'], index);
                this._bindings.push(binding);
            }

        }, this);

        this.triggerOnChange();
    },

    triggerOnChange: function () {
        this.trigger('change', this.getCriteriaList());
    },

    getCriteriaList: function () {
        return this._criteriaList;
    },

    isReady: function () {
        return this._bindings.every(function (binding) {
            var source = binding.getSource();
            return source && ( !('isDataReady' in source) || source.isDataReady() );
        });
    },

    bindToValue: function(valueMetadata, indexOfFilter){
        var binding = this._bindingBuilder(valueMetadata);
        var that = this;

        binding.bindElement({

            setProperty: function(propName, propValue){
                that._criteriaList[indexOfFilter]['Value'] = propValue;
                that.triggerOnChange();
            },

            onPropertyChanged: function(){}
        });

        return binding;
    },

    onChange: function (handler) {
        this.on('change', handler);
    }
});

_.extend(FilterManager.prototype, Backbone.Events);
