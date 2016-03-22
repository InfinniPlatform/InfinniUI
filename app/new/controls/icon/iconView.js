/**
 * @class IconView
 * @arguments ControlView
 */
var IconView = ControlView.extend({

    tagName: 'i',

    render: function(){
        this.prerenderingActions();
        
        var value = this.model.get('value');
        this.$el.attr('class', 'pl-icon fa fa-' + value);
        
        this.updateProperties();

        this.trigger('render');
        this.postrenderingActions();
        return this;
    }

});