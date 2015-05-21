var BaseDataSource = Backbone.Model.extend({
    defaults: {
        name: null,
        idProperty: 'Id'
    },

    initialize: function(){

    },

    getName: function(){
        return this.get('name');
    },

    setName: function(name){
        this.set('name', name);
    },

    getIdProperty: function () {
        return return this.get('idProperty');
    }
});