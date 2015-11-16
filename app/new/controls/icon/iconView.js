/**
 * @class IconView
 * @augments ControlView
 */
var IconView = ControlView.extend({

    tagName: 'i',

    render: function(){
        var value = this.model.get('value');
        this.$el.attr('class', 'pl-icon fa fa-' + value);

        return this;
    }

});