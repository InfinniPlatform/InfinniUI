function FilterPanel(parentView) {
    _.superClass(FilterPanel, this, parentView);
}

_.inherit(FilterPanel, Element);

_.extend(FilterPanel.prototype, {

    createControl: function () {
        return new FilterPanelControl();
    },

    setView: function (view) {
        return this.control.set('view', view);
    },

    getView: function () {
        return this.control.get('view');
    },

    setDataSource: function (dataSource) {
        return this.control.set('dataSource', dataSource);
    },

    getDataSource: function () {
        return this.control.get('dataSource');
    },

    setFilters: function(filters){
        return this.control.set('filters', filters);
    },

    getFilters: function(){
        return this.control.get('filters');
    },

    setQuery: function(query){
        return this.control.set('query', query);
    },

    getQuery: function(){
        if(!this.control.get('value')) {
            return this.control.get('query');
        }else{
            return this.control.get('value');
        }
    },

//    setProperty: function(property){
//        return this.control.set('property', property)
//    },

    getOrientation: function () {
        return this.control.get('orientation');
    },

    setOrientation: function (orientation) {
        if (typeof orientation == 'string') {
            this.control.set('orientation', orientation);
        }
    },

    getHeight: function () {
        return 44;
    }
}, valuePropertyMixin);