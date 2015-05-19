var ControlModel = Backbone.Model.extend({
    defaults: {
        text: null,
        name: null,
        enabled: true,
        parentEnabled: true,
        visible: true,
        horizontalAlignment: 'Stretch',
        verticalAlignment: 'Top',
        isLoaded: false,
        validationState: 'success',
        validationMessage: ''
    },

    initialize: function(){

    }
});