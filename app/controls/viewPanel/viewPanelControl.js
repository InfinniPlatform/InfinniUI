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

var ViewPanelModel = ControlModel.extend({
    defaults: _.defaults({
        layout: null
    }, ControlModel.prototype.defaults),

    initialize: function(){
        var that = this;

        ControlModel.prototype.initialize.apply(this);

        this.once('change:layout', function (model, layout) {
            if(layout && layout.onLoaded){
                that.subscribeOnLoaded();
            }
        });
    },

    subscribeOnLoaded: function(){
        var that = this;
        var layout = this.get('layout');

        layout.onLoaded(function(){
            that.set('isLoaded', true);
        });
    }
});

var ViewPanelView = ControlView.extend({
    className: 'pl-view-panel',

    initialize: function () {
        ControlView.prototype.initialize.apply(this);
        this.listenTo(this.model, 'change:layout', this.onChangeLayoutHandler);
    },

    onChangeLayoutHandler: function (model, layout) {
        this.$el.empty();
        this.$el.append(layout.render());
    },

    render: function () {
        this.prerenderingActions();

        var layout = this.model.get('layout');

        if(layout){
            this.$el.append(layout.render());
        }

        this.postrenderingActions(false);
        return this;
    }
});