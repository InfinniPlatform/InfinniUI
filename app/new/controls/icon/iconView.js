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

    updateValue: function () {
        this.renderIcon();
    }

});