var RadioGroupItemModel = Backbone.Model.extend({

});

var RadioGroupItemView = Backbone.View.extend({

    className: "pl-radio-group-item",

    events: {
        "click": "onClickHandler"
    },

    UI: {
        radio: 'input',
        label: '.pl-radio-group-label'
    },

    template: InfinniUI.Template["controls/radioGroup/template/item.text.tpl.html"],

    initialize: function (options) {
        this.model = new RadioGroupItemModel();
        this.model.set('item', options.item);
        this.model.set('index', options.index);
        this.model.set('readOnly', options.readOnly);
        this.model.set('enabled', options.enabled);

        this.model.set('name', _.isEmpty(options.name) ? guid() : options.name);

        this.on('check', this.onCheckHandler);
        this.on('toggle', this.onToggleHandler);
        this.on('readOnly', this.onReadOnlyHandler);
        this.on('enabled', this.onEnabledHandler);

        this.on('change:readOnly', this.updateEnabled);
        this.on('change:enabled', this.updateEnabled);
    },

    getIsAvailable: function () {
        return !this.model.get('readOnly') && this.model.get('enabled');
    },

    updateEnabled: function () {
        this.ui.radio.prop('disabled', !this.getIsAvailable());
    },

    onReadOnlyHandler: function (readOnly) {
        this.model.set('readOnly', readOnly);
    },

    onEnabledHandler: function (enabled) {
        this.model.set('enabled', enabled);
    },

    render: function () {
        var item = this.model.get('item');
        var index = this.model.get('index');
        this.$el.html(this.template({name: this.model.get('name')}));
        this.bindUIElements();

        this.updateEnabled();
        this.ui.radio.uniform();
        this.ui.label
            .empty()
            .append(this.renderStrategy.render(item, index));
        return this;
    },

    update: function () {
        $.uniform.update(this.ui.radio);
    },

    setRenderStrategy: function (strategy) {
        this.renderStrategy = strategy;
    },

    onClickHandler: function () {
        if (this.getIsAvailable()) {
            this.trigger('check', this.model.get('item'), this.model.get('index'));
        }
    },

    checkItem: function (checked) {
        if (typeof checked === 'undefined') {
            checked = true;
        }

        this.ui.radio.prop('checked', checked);
        this.update();
    },

    onCheckHandler: function () {
        this.checkItem(true);
    },

    onToggleHandler: function (item) {
        var checked = _.isEqual(item, this.model.get('item'));
        this.checkItem(checked);
    }

});


_.extend(RadioGroupItemView.prototype, bindUIElementsMixin);