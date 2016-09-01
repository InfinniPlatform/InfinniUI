var TabHeaderModel = Backbone.Model.extend({

    defaults: {
        text: '',
        canClose: false
    }
});

var TabHeaderView = Backbone.View.extend({

    className: "pl-tabheader",

    tagName: "li",

    template: InfinniUI.Template["controls/tabPanel/tabHeader/template/tabHeader.tpl.html"],

    events: {
        "click": "onClickHandler",
        "click .pl-close": "onClickCloseHandler"
    },

    UI: {
        label: '.pl-tabheader-text',
        close: '.pl-close'
    },

    initialize: function (options) {
        this.model = new TabHeaderModel(options);

        this.on('rendered', this.onRenderedHandler);
    },

    render: function () {
        this.$el.html(this.template);
        this.bindUIElements();
        this.trigger('rendered');
        //devblockstart
        window.InfinniUI.global.messageBus.send('render', {element: this});
        //devblockstop
        return this;
    },

    /**
     *
     * @param {string} value
     */
    setText: function (value) {
        this.model.set('text', value);
    },

    /**
     *
     * @param {boolean} value
     */
    setCanClose: function (value) {
        this.model.set('canClose', value);
    },

    /**
     *
     * @param {boolean} value
     */
    setSelected: function (value) {
        this.model.set('selected', value);
    },

    /**
     * @protected
     */
    updateProperties: function () {
        this.updateTextHandler();
        this.updateCanClose();
        this.updateSelectedHandler();
    },

    /**
     * @protected
     */
    onRenderedHandler: function () {
        this.updateProperties();
        this.listenTo(this.model, 'change:text', this.updateTextHandler);
        this.listenTo(this.model, 'change:selected', this.updateSelectedHandler);
        this.listenTo(this.model, 'cahnge:canClose', this.updateCanClose);
    },

    /**
     * @protected
     */
    updateTextHandler: function () {
        var text = this.model.get('text');
        this.ui.label.text(text);
    },

    /**
     * @protected
     */
    updateCanClose: function () {
        var canClose = this.model.get('canClose');
        this.ui.close.toggleClass('hidden', !canClose);
    },

    /**
     * @protected
     */
    updateSelectedHandler: function () {
        var selected = this.model.get('selected');
        this.$el.toggleClass('pl-active active', selected);
    },

    onClickHandler: function (event) {
        this.trigger('selected');
    },

    onClickCloseHandler: function (event) {
        event.stopPropagation();
        this.trigger('close');
    }

});

_.extend(TabHeaderView.prototype, bindUIElementsMixin);
