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

    events: {
        'click': 'onClickHandler'
    },

    template: function(){return '';},

    UI: {
    },

    updateBackground: function () {
        var customStyle = this.model.get('background');

        if (this.currentBackground) {
            this.$el
                .removeClass(this.valueToBackgroundClassName(this.currentBackground));
        }

        if (customStyle) {
            this.$el
                .addClass(this.valueToBackgroundClassName(customStyle));
        }

        this.currentBackground = customStyle;
    },

    //updateForeground: function () {
    //    var customStyle = this.model.get('foreground');
    //
    //    if (this.currentBackground) {
    //        this.ui.button
    //            .removeClass(this.valueToBackgroundClassName(this.currentBackground));
    //    }
    //
    //    if (customStyle) {
    //        this.ui.button
    //            .addClass(this.valueToBackgroundClassName(customStyle));
    //    }
    //
    //    this.currentBackground = customStyle;
    //},

    getButtonElement: function(){
        return this.$el;
    }

});

InfinniUI.ObjectUtils.setPropertyValueDirect(window.InfinniUI, 'Button.viewModes.link', LinkButtonView);