/**
 * @class IconView
 * @arguments ControlView
 */
var IconView = ControlView.extend({

    tagName: 'i',

    render: function(){
        this.prerenderingActions();
        this.updateProperties();
        this.trigger('render');
        this.postrenderingActions();
        return this;
    },

    renderIcon: function () {
        var value = this.model.get('value');
        this.$el.attr('class', 'pl-icon fa fa-' + value);
    },

    initHandlersForProperties: function () {
        ControlView.prototype.initHandlersForProperties.call(this);
        this.listenTo(this.model, 'change:value', this.updateValue);
    },

    updateProperties: function () {
        ControlView.prototype.updateProperties.call(this);
        this.updateValue();
    },

    updateFocusable: function () {
        var focusable = this.model.get('focusable');

        if (focusable) {
            this.$el.attr('tabindex', 0);
        } else {
            this.$el.removeAttr('tabindex');
        }
    },

    updateValue: function () {
        this.renderIcon();
    }

});