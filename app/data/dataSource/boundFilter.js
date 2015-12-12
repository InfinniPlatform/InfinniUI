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
        var binding;
        var filter;
        var that = this;

        if($.isArray(this.filtersMetadata)){
            for(var i = 0, ii = this.filtersMetadata.length; i < ii; i++){
                filter = this.filtersMetadata[i];

                if('Value' in filter && $.isPlainObject(filter['Value'])){
                    binding = this.bindingBuilder(filter['Value']);

                    binding.bindElement({

                        setProperty: function(context, args){
                            that.handlers.onChange.fire(args.value);
                        },

                        onPropertyChanged: function(){}
                    });

                    this.bindings[i] = binding;
                }
            }
        }
    },

    isReady: function(){
        var source = this.bindings.getSource();

        for(var k in this.bindings){
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
    }

});