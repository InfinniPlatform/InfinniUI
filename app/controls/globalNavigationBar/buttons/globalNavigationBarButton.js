var GlobalNavigationBarButtonModel = Backbone.Model.extend({
    defaults: {
        key: '',
        text: '',
        active: false,
        description: ''
    }
});

var GlobalNavigationBarButtonView = Backbone.View.extend({

    //className: 'pl-global-navigation-bar-button',
    className: 'pl-gn-button',

    activeClass: 'pl-active',

    template: InfinniUI.Template["controls/globalNavigationBar/buttons/template/template.tpl.html"],
    //template: _.template('<a data-key="<%=key%>"><%=text%><i class="fa fa-times"></i></a>'),

    events: {
        'click .pl-gn-button-link': 'onClickHandler',
        'click .pl-gn-button-close': 'onClickCloseHandler'
    },

    initialize: function (options) {
        this.model = new GlobalNavigationBarButtonModel(options);
        this.listenTo(this.model, 'change:text', this.render);
        this.listenTo(this.model, 'change:active', this.onChangeActiveHandler);
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    setText: function (text) {
        this.model.set('text', text);
    },

    setActive: function (active) {
        var activate = this.model.get('key') == active;
        this.model.set('active', activate);
    },

    getKey: function () {
        return this.model.get('key');
    },

    onClickHandler: function (event) {
        event.preventDefault();

        this.trigger('application:activate', this.model.get('key'));
    },

    onClickCloseHandler: function (event) {
        event.preventDefault();
        this.trigger('application:closing');
    },

    onClick: function (handler) {
        this.on('click', handler)
    },

    onChangeActiveHandler: function () {
        var active = this.model.get('active');

        this.$el.toggleClass(this.activeClass, active);
    }

});