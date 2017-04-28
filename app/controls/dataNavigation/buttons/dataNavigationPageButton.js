/**
 *
 * @constructor
 */
var DataNavigationPageButton = DataNavigationBaseButton.extend( {

    template: InfinniUI.Template[ 'controls/dataNavigation/buttons/template/page.tpl.html' ],

    events: {
        'click': 'onClickHandler'
    },

    /**
     *
     * @param options
     */
    initialize: function( options ) {
        this.model = new DataNavigationPageButtonModel();
        DataNavigationBaseButton.prototype.initialize.call( this, options );
        this.model.set( 'pageNumber', options.pageNumber );
    },

    /**
     *
     */
    initHandlersForProperties: function() {
        DataNavigationBaseButton.prototype.initHandlersForProperties.call( this );
        this.listenTo( this.model, 'change:isCurrent', this.updateIsCurrent );
    },

    /**
     *
     */
    updateProperties: function() {
        DataNavigationBaseButton.prototype.updateProperties.call( this );
        this.updateIsCurrent();
    },

    /**
     *
     */
    updateIsCurrent: function() {
        this.$el.toggleClass( 'active', this.model.get( 'isCurrent' ) );
    },

    /**
     *
     */
    onClickHandler: function() {
        this.trigger( 'command', 'page', { pageNumber: this.model.get( 'pageNumber' ) } );
    }

} );

InfinniUI.DataNavigationPageButton = DataNavigationPageButton;

/**
 *
 * @constructor
 */
var DataNavigationPageButtonModel = DataNavigationBaseButtonModel.extend( {

    defaults: {
        isCurrent: false
    },

    /**
     *
     */
    subscribeToParent: function() {
        DataNavigationBaseButtonModel.prototype.subscribeToParent.call( this );

        var parent = this.get( 'parent' );

        this.listenTo( parent.model, 'change:pageNumber', function() {
            this.updateIsCurrent();
        } );
        this.updateIsCurrent();
    },

    /**
     *
     */
    updateIsCurrent: function() {
        var parent = this.get( 'parent' );
        var isCurrent = parent.model.get( 'pageNumber' ) === this.get( 'pageNumber' );

        this.set( 'isCurrent', isCurrent );
    }

} );

InfinniUI.DataNavigationPageButtonModel = DataNavigationPageButtonModel;
