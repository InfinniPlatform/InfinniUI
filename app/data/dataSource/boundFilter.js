var BoundFilter = function(parentView, filterMetadata){
    this.parentView = parentView;
    this.filterMetadata = filterMetadata;
    this.isReady = false;
    this.bindings = {};
    this.handlers = {
        onChange: $.Callbacks()
    };

    this.init();
};

_.extend(BoundFilter.prototype, {

    init: function(){

    },

    isReady: function(){
        return this.isReady;
    },

    getCriteriaList: function(){
        var result = [];
        var filter;
        var value;

        if($.isArray(this.filterMetadata)){
            for(var i = 0, ii = this.filterMetadata.length; i < ii; i++){
                filter = this.filterMetadata[i];

                if('Value' in filter && $.isPlainObject(filter['Value'])){
                    this.bindings[i] = new DataBinding();
                }
            }

        }else{
            return [];
        }
    },

    onChange: function(handler){
        this.handlers.onChange.add(handler);
    }

});