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
        this.updateType();
    },

    updateType: function() {
        var type = this.model.get('type');
        this.getButtonElement().attr('type', type);
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
        var $button = this.getButtonElement();

        if($button) {
            $button.html(textForButton);
        }
    },

    updateFocusable: function () {
        var focusable = this.model.get('focusable');

        if (!focusable) {
            this.getButtonElement().attr('tabindex', -1);
        } else {
            this.getButtonElement().removeAttr('tabindex');
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
            this.getButtonElement()
                .removeClass(this.valueToBackgroundClassName(this.currentBackground));
        }

        if (customStyle) {
            this.getButtonElement()
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
        //devblockstart
        window.InfinniUI.global.messageBus.send('render', {element: this});
        //devblockstop
        return this;
    },

    getButtonElement: function(){
        return this.ui.button;
    },

    setFocus: function () {
        this.getButtonElement().focus();
    }



});

_.extend(CommonButtonView.prototype, highlightMixin.controlView);


InfinniUI.ObjectUtils.setPropertyValueDirect(window.InfinniUI, 'viewModes.Button.common', CommonButtonView);
