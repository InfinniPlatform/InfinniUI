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
        this.set('guid', guid(), {silent: true});
    },
    
    set: function (key, val, options) {
        var
            defaults = this.defaults,
            attrs;

        if (key == null) return this;
        if (typeof key === 'object') {
            attrs = key;
            options = val;
        } else {
            (attrs = {})[key] = val;
        }

        for (var name in attrs) {
            if (typeof attrs[name] !== 'undefined' && attrs[name] !== null) {
                continue;
            }

            if (name in defaults) {
                attrs[name] = defaults[name];
            }
        }
        Backbone.Model.prototype.set.call(this, attrs, options);
    }

});