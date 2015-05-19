var ControlModel = Backbone.Model.extend({
    defaults: {
        text: null,
        name: null,
        enabled: true,
        visible: true,
        horizontalAlignment: 'Stretch',
        isLoaded: false,
        validationState: 'success',
        validationMessage: ''
    },

    initialize: function(){

    }
});