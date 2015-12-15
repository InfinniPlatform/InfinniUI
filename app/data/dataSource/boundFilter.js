var BoundFilter = function(filtersMetadata, bindingBuilder){
    this.filtersMetadata = filtersMetadata;
    this.filters = filtersMetadata.slice(0);
    this.bindingBuilder = bindingBuilder;
    this.bindings = {};
    this.handlers = {
        onChange: $.Callbacks()
    };

    this.init();
};

_.extend(BoundFilter.prototype, {

    init: function(){
        var filter;
        var that = this;

        if($.isArray(this.filtersMetadata)){
            for(var i = 0, ii = this.filtersMetadata.length; i < ii; i++){
                filter = this.filtersMetadata[i];

                if('Value' in filter && $.isPlainObject(filter['Value'])){
                    this.bindToValue(filter['Value'], i);
                }
            }
        }
    },

    isReady: function(){
        var source;

        for(var k in this.bindings){
            source = this.bindings[k].getSource();

            if('isReady' in source){
                if(!source.isReady()){
                    return false;
                }
            }
        }

        return true;
    },

    getCriteriaList: function(){
        return this.filters;
    },

    onChange: function(handler){
        this.handlers.onChange.add(handler);
    },

    bindToValue: function(valueMetadata, indexOfFilter){
        var binding = this.bindingBuilder(valueMetadata);
        var that = this;

        binding.bindElement({

            setProperty: function(context, args){
                that.filters[indexOfFilter]['Value'] = args.value;
                that.handlers.onChange.fire(that.filters);
            },

            onPropertyChanged: function(){}
        });

        this.bindings[indexOfFilter] = binding;
    }

});