/**
 *
 * @constructor
 */
var DataNavigationBaseButtonModel = Backbone.Model.extend( {

    /**
     *
     */
    initialize: function() {
        this.on( 'change:parent', this.subscribeToParent, this );
    },

    /**
     *
     */
    subscribeToParent: function() {
    }

} );

InfinniUI.DataNavigationBaseButtonModel = DataNavigationBaseButtonModel;

/**
 *
 * @constructor
 */
var DataNavigationBaseButton = Backbone.View.extend( {

    tagName: 'li',

    /**
     *
     * @param options
     */
    initialize: function( options ) {
        Backbone.View.prototype.initialize.call( this, options );
        this.once( 'render', function() {
            this.initHandlersForProperties();
        }, this );
    },

    /**
     *
     */
    initHandlersForProperties: function() {
    },

    /**
     *
     */
    updateProperties: function() {
    },

    /**
     *
     * @returns {*}
     */
    getData: function() {
        return this.model.toJSON();
    },

    /**
     *
     * @param parent
     */
    setParent: function( parent ) {
        this.model.set( 'parent', parent );
        this.subscribeForParent( parent );
    },

    /**
     *
     * @returns {DataNavigationBaseButton}
     */
    render: function() {
        var template = this.template( this.getData() );

        this.$el.html( template );
        this.trigger( 'render' );
        this.updateProperties();

        return this;
    },

    /**
     *
     */
    subscribeForParent: function() {
    }

} );

InfinniUI.DataNavigationBaseButton = DataNavigationBaseButton;
