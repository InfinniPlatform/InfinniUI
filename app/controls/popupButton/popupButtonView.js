var PopupButtonView = ControlView.extend({
    className: 'pl-popup-button',

    UI: {
        caption: '.caption',
        items: '.dropdown-menu',
        button: '.pl-popup-btn-main',
        toggle: '.pl-popup-btn-toggle'
    },

    events: {
        'click .pl-popup-btn-main': 'onClickHandler'
    },

    template: InfinniUI.Template["controls/popupButton/template/popupbutton.tpl.html"],

    templateItem: InfinniUI.Template["controls/popupButton/template/popupbuttonitem.tpl.html"],

    initialize: function () {
        ControlView.prototype.initialize.apply(this);
        this.listenTo(this.model, 'change:items', this.onChangeItemsHandler);
        this.listenTo(this.model, 'change:text', this.onChangeTextHandler);
        this.listenTo(this.model, 'change:useDefaultAction', this.onChangeUseDefaultAction);
        this.listenTo(this.model, 'change:enabled', this.updateEnabled);
    },

    render: function () {
        this.prerenderingActions();

        this.$el.html(this.template({}));
        this.bindUIElements();

        this.onChangeTextHandler();
        this.updateEnabled();
        this.renderItems();

        this.postrenderingActions();
        return this;
    },

    onChangeItemsHandler: function () {
        this.rerender();
    },

    onChangeTextHandler: function () {
        if (!this.wasRendered) {
            return;
        }

        var useDefaultAction = this.model.get('useDefaultAction');
        var text = this.model.get('text');
        this.ui.button.toggleClass('hidden', !useDefaultAction);
        this.ui.button.text(text);
        this.ui.toggle.text(useDefaultAction ? '' : text);

    },

    renderItems: function () {
        var items = this.model.get('items');
        var wrap = this.templateItem();
        _.each(items, function (item) {
            var $item = item.render();
            this.ui.items.append($item);
            $item.wrap(wrap);
        }, this);

    },

    onClickHandler: function(){
        this.trigger('onClick');
    },

    onChangeUseDefaultAction: function () {
        this.onChangeTextHandler();
    },

    updateEnabled: function () {
        if (!this.wasRendered) {
            return;
        }
        var enabled = this.model.get('enabled');
        this.ui.button.prop('disabled', !enabled);
        this.ui.toggle.prop('disabled', !enabled);
    }


});