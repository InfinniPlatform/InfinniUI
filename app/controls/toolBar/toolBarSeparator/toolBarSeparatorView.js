var ToolBarSeparatorView = ControlView.extend({

    className: 'pl-tool-bar-separator',

    UI: {
        text: 'span'
    },

    template: InfinniUI.Template["controls/toolBar/toolBarSeparator/template/template.tpl.html"],

    initialize: function () {
        ControlView.prototype.initialize.apply(this);

        this.listenTo(this.model, 'change:value', this.updateText);
        this.listenTo(this.model, 'change:text', this.updateText);
        this.listenTo(this.model, 'change:visible', this.updateVisible);
    },

    render: function () {
        this.prerenderingActions();

        var $html = $(this.template({}));

        this.$el.append($html);
        this.bindUIElements();
        this.updateText();
        this.updateVisible();

        this.postrenderingActions();

        return this;
    },

    updateText: function () {
        if (!this.wasRendered) {
            return false;
        }

        var text = this.model.get('value');

        if (typeof text === 'undefined') {
            text = this.model.get('text');
        }

        this.ui.text.text(text);
    },

    updateVisible: function () {
        if (!this.wasRendered) {
            return false;
        }
        this.$el.toggleClass('hidden', !this.model.get('visible'));
    }

});