var ScrollPanelControl = function () {
    _.superClass(ScrollPanelControl, this);
};

_.inherit(ScrollPanelControl, Control);

ScrollPanelControl.prototype.createControlModel = function () {
    return new ScrollPanelModel();
};

ScrollPanelControl.prototype.createControlView = function (model) {
    return new ScrollPanelView({model: model});
};

var ScrollPanelModel = Backbone.Model.extend({
    defaults: _.defaults({
        verticalScroll: '',
        horizontalScroll: '',
        layoutPanel: null
    }, ControlModel.prototype.defaults)
});

var ScrollPanelView = ControlView.extend({
    className: 'pl-scroll-panel',

    initialize: function () {
        ControlView.prototype.initialize.apply(this);
    },

    render: function () {
        this.prerenderingActions();

        this.$el.html(this.model.get('layoutPanel').render());
        //this.$el.children().slimScroll({
            //height: '250px'
        //});

        this.postrenderingActions();
        return this;
    }
});