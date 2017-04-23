var DataNavigationBaseButtonModel = Backbone.Model.extend( {

    initialize: function() {
        this.on( 'change:parent', this.subscribeToParent, this );
    },

    subscribeToParent: function() {
    }

} );

InfinniUI.DataNavigationBaseButtonModel = DataNavigationBaseButtonModel;

var DataNavigationBaseButton = Backbone.View.extend( {

    tagName: 'li',

    initialize: function( options ) {
        Backbone.View.prototype.initialize.call( this, options );
        this.once( 'render', function() {
            this.initHandlersForProperties();
        }, this );
    },

    initHandlersForProperties: function() {
    },

    updateProperties: function() {
    },

    getData: function() {
        return this.model.toJSON();
    },

    setParent: function( parent ) {
        this.model.set( 'parent', parent );
        this.subscribeForParent( parent );
    },

    render: function() {
        var template = this.template( this.getData() );

        this.$el.html( template );
        this.trigger( 'render' );
        this.updateProperties();

        return this;
    },

    subscribeForParent: function( parent ) {
    }

} );

InfinniUI.DataNavigationBaseButton = DataNavigationBaseButton;

