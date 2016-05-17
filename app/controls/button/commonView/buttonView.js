/**
 * @class ButtonView
 * @augments ControlView
 */
var CommonButtonView = ControlView.extend({

    className: 'pl-button',

    template: InfinniUI.Template["controls/button/commonView/template/button.tpl.html"],

    UI: {
        button: 'button'
    },

    events: {
        'click button': 'onClickHandler'
    },

    initialize: function () {
        ControlView.prototype.initialize.apply(this, arguments);
        this.initHighlightMixin();
    },

    updateProperties: function(){
        ControlView.prototype.updateProperties.call(this);

        this.updateContent();
    },

    updateContent: function(){
        var contentTemplate = this.model.get('contentTemplate');
        var content = this.model.get('content');
        var args = {
            content: content
        };
        var contentElement;
        var $button = this.getButtonElement();

        if(contentTemplate){
            contentElement = contentTemplate(null, args);
            $button.html(contentElement.render());

        }else if(content !== undefined && content !== null){
            $button.html(content);
        }
    },

    updateText: function(){
        var textForButton = this.model.get('text');
        if (typeof textForButton == 'string'){
            this.getButtonElement().html(textForButton);
        }
    },

    updateFocusable: function () {
        var focusable = this.model.get('focusable');

        if (!focusable) {
            this.ui.button.attr('tabindex', -1);
        } else {
            this.ui.button.removeAttr('tabindex');
        }
    },

    updateEnabled: function(){
        ControlView.prototype.updateEnabled.call(this);

        var isEnabled = this.model.get('enabled');
        this.getButtonElement().prop('disabled', !isEnabled);
    },

    updateBackground: function () {
        var customStyle = this.model.get('background');

        if (this.currentBackground) {
            this.ui.button
                .removeClass(this.valueToBackgroundClassName(this.currentBackground));
        }

        if (customStyle) {
            this.ui.button
                .addClass(this.valueToBackgroundClassName(customStyle));
        }

        this.currentBackground = customStyle;
    },

    render: function () {
        this.prerenderingActions();

        this.renderTemplate(this.template);
        this.updateProperties();
        this.trigger('render');

        this.postrenderingActions();
        return this;
    },

    getButtonElement: function(){
        return this.ui.button;
    },

    setFocus: function () {
        this.ui.button.focus();
    }



});

_.extend(CommonButtonView.prototype, highlightMixin.controlView);


InfinniUI.ObjectUtils.setPropertyValueDirect(window.InfinniUI, 'Button.viewModes.common', CommonButtonView);
