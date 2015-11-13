/**
 * @class ButtonView
 * @augments ControlView
 */
var LinkButtonView = CommonButtonView.extend({

    tagName: 'a',

    className: 'pl-button',

    attributes: {
        href: 'javascript:;'
    },

    template: function(){return '';},

    UI: {
    },

    getButtonElement: function(){
        return this.$el;
    }

});

InfinniUI.ObjectUtils.setPropertyValueDirect(window.InfinniUI, 'Button.viewModes.link', LinkButtonView);