var ControlModel = Backbone.Model.extend({
    defaults: {
        text: null,
        name: null,
        enabled: true,
        parentEnabled: true,
        visible: true,
        textHorizontalAlignment: InfinniUI.TextHorizontalAlignment.left,
        horizontalAlignment: 'Stretch',
        verticalAlignment: 'Top',
        textStyle: null,
        background: null,
        foreground: null,
        isLoaded: false,
        validationState: 'success',
        validationMessage: '',
        focusable: true,
        focused: false
    },

    initialize: function(){
        this.set('guid', guid(), {silent: true});
        this.on('change:focused', function (model, value) {
            this.trigger(value ? 'OnGotFocus' : 'OnLostFocus');
        });
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
        return Backbone.Model.prototype.set.call(this, attrs, options);
    }

});

InfinniUI.ControlModel = ControlModel;