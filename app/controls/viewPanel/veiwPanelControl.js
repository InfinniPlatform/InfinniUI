var ViewPanelControl = function () {
    _.superClass(ViewPanelControl, this);
};

_.inherit(ViewPanelControl, Control);

ViewPanelControl.prototype.createControlModel = function () {
    return new ViewPanelModel();
};

ViewPanelControl.prototype.createControlView = function (model) {
    return new ViewPanelView({model: model});
};

var ViewPanelModel = Backbone.Model.extend({
    defaults: _.defaults({
        layout: ''
    }, ControlModel.prototype.defaults)
});

var ViewPanelView = ControlView.extend({
    className: 'pl-view-panel',

    initialize: function () {
        ControlView.prototype.initialize.apply(this);
        //this.listenToOnce(this.model, 'change:layout', this.onChangeLayoutHandler); //Почему так было??
        this.listenTo(this.model, 'change:layout', this.onChangeLayoutHandler);
    },

    onChangeLayoutHandler: function (model, layout) {
        this.$el.empty();
        this.$el.append(layout.render());
    },

    render: function () {
        this.prerenderingActions();

        var layout = this.model.get('layout');

        this.$el.append(layout.render());

        this.postrenderingActions();
        return this;
    }
});