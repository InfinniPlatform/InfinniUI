var DataNavigationBaseButton = Backbone.View.extend({

    tagName: 'li',

    initialize: function (options) {
        Backbone.View.prototype.initialize.call(this, options);
        this.model = new Backbone.Model();
    },

    setParent: function (parent) {
        this.model.set('parent', parent);
    },

    getData: function () {
        return this.model.toJSON();
    },

    render: function () {
        var template = this.template(this.getData());
        this.$el.html(template);
        this.trigger('render');

        return this;
    }

});

