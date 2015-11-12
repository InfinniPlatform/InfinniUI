/**
 * @class ButtonView
 * @augments ControlView
 */
var ButtonView = ControlView.extend({

    className: 'pl-button',

    template: InfinniUI.Template["new/controls/button/commonView/template/button.tpl.html"],

    UI: {
        button: 'button'
    },

    events: {
        'click button': 'onClickHandler'
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

        if(contentTemplate){
            contentElement = contentTemplate(null, args);
            this.ui.button.html(contentElement.render());

        }else if(content !== undefined && content !== null){
            this.ui.button.html(content);
        }
    },

    updateText: function(){
        var textForButton = this.model.get('text');
        if (typeof textForButton == 'string'){
            this.ui.button.html(textForButton);
        }
    },

    updateEnabled: function(){
        ControlView.prototype.updateEnabled.call(this);

        var isEnabled = this.model.get('enabled');
        this.ui.button.prop('disabled', !isEnabled);
    },

    render: function () {
        this.prerenderingActions();

        this.renderTemplate(this.template);
        this.updateProperties();
        this.trigger('render');

        this.postrenderingActions();
        return this;
    },

    onClickHandler: function (event) {
        this.trigger('onClick');
    }

});
