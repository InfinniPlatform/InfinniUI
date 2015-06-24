var ToggleButtonView = ControlView.extend({
    className: 'pl-toggle-button',
    template: _.template('<input type="checkbox" class="pl-control" name="my-checkbox" checked="checked">'),

    events: {
        'switchChange.bootstrapSwitch input[type="checkbox"]': 'updateModelVal',
        'focusin input[type="checkbox"]': 'onFocusInDebounceHandler',
        'focusout input[type="checkbox"]': 'onFocusOutDebounceHandler'
    },

    onFocusInHandler: function (event) {
        this.callEventHandler('OnGotFocus');
    },

    onFocusOutHandler: function (event) {
        this.callEventHandler('OnLostFocus');
    },

    initialize: function () {
        ControlView.prototype.initialize.apply(this);

        this.initValue();
        this.initOnText();
        this.initOffText();

        this.onFocusInDebounceHandler = _.debounce(this.onFocusInHandler, 100);
        this.onFocusOutDebounceHandler = _.debounce(this.onFocusOutHandler, 100);

        this.listenTo(this.model, 'change', this.updateValue);
    },

    render: function () {
        this.prerenderingActions();

        this.$el.html(this.template({}));
        hideScreen.add(this.$el);
        this.$el.find('input').bootstrapSwitch();
        this.$el.detach();

        this.updateValue();
        this.updateTextOn();
        this.updateTextOff();
        this.updateEnabled();

        this.postrenderingActions();
        return this;
    },

    initValue: function () {
        this.listenTo(this.model, 'change:value', this.updateValue);
        this.updateValue();
    },
    initOnText: function () {
        this.listenTo(this.model, 'change:textOn', this.updateTextOn);
        this.updateTextOn();
    },
    initOffText: function () {
        this.listenTo(this.model, 'change:textOff', this.updateTextOff);
        this.updateTextOff();
    },

    updateEnabled: function () {
        ControlView.prototype.updateEnabled.apply(this);

        if (this.wasRendered) {
            var isEnabled = this.model.get('enabled');
            this.$el.find('input').bootstrapSwitch('disabled', !isEnabled);
        }
    },
    updateModelVal: function (event) {
        var val = event.target.checked;
        this.model.set({value: val});
    },
    updateTextOn: function () {
        if (this.wasRendered) {
            var textOn = this.model.get('textOn');
            this.$el.find('input').bootstrapSwitch('onText', textOn);
        }
    },
    updateTextOff: function () {
        if (this.wasRendered) {
            var textOff = this.model.get('textOff');
            this.$el.find('input').bootstrapSwitch('offText', textOff);
        }
    },
    updateValue: function () {
        if (this.wasRendered) {
            var value = this.model.get('value');
            this.$el.find('input').bootstrapSwitch('state', value);
        }
    }
});

var hideScreen = new hiddenScreen();