var DataNavigationView = ControlView.extend( {

    template: InfinniUI.Template[ 'controls/dataNavigation/template/dataNavigation.tpl.html' ],

    className: 'pl-data-navigation',

    UI: {
        buttons: 'ul',
        sizes: '.pl-page-size'
    },

    initialize: function( options ) {
        ControlView.prototype.initialize.call( this, options );
        this._childViews = [];
        this.buttonsFactory = new DataNavigationButtonFactory( this );
        this._pageSizes = new DataNavigationPageSizes();
        this._pageSizes.setParent( this );
    },

    initHandlersForProperties: function() {
        ControlView.prototype.initHandlersForProperties.call( this );
        this.listenTo( this.model, 'change:pageStart', this.updateButtons );
        this.listenTo( this.model, 'change:pageCount', this.updateButtons );
        this.listenTo( this.model, 'change:isDataReady', this.updateButtons );
    },

    updateProperties: function() {
        ControlView.prototype.updateProperties.call( this );
        this.updateButtons();
    },

    render: function() {
        this.prerenderingActions();

        this.renderTemplate( this.template );
        this.updateProperties();
        this.trigger( 'render' );
        this.renderPageSizes();
        this.postrenderingActions();

        //devblockstart
        InfinniUI.global.messageBus.send( 'render', { element: this } );
        //devblockstop
        return this;
    },

    renderPageSizes: function() {
        this.ui.sizes.append( this._pageSizes.render().$el );
    },

    renderButtons: function() {
        var model = this.model;
        var template = model.get( '_buttonsTemplate' );
        var buttonsCount = model.get( '_buttonsCount' );
        var pageCount = model.get( 'pageCount' );
        var pageNumber = model.get( 'pageNumber' );
        var pageStart = model.get( 'pageStart' );
        var isDataReady = model.get( 'isDataReady' );
        var buttons;
        var nowManyElementsRemove;

        this._removeChildViews();

        if( !isDataReady ) {
            return;
        }

        var buttonsFactory = this.buttonsFactory;

        buttons = template.reduce( function( buttons, buttonType ) {
            var button;

            if( buttonType === 'page' ) {
                for( var i = 0; i < buttonsCount; i = i + 1 ) {
                    button = buttonsFactory.createButton( buttonType, { pageNumber: pageStart + i } );
                    buttons.push( button );
                }
            } else {
                button = buttonsFactory.createButton( buttonType );
                buttons.push( button );
            }

            return buttons;
        }, [] );

        if( typeof pageCount == 'number' && pageStart + buttonsCount >= pageCount ) {
            nowManyElementsRemove = pageStart + buttonsCount - pageCount + 1;

            if( pageCount == 0 ) {
                nowManyElementsRemove += 1;
            }

            buttons.splice( buttons.length - nowManyElementsRemove, 100 );
        }

        var $buttons = buttons.map( function( button ) {
            this.listenTo( button, 'command', this.onCommandHandler );
            this._appendChildView( button );
            return button.render().$el;
        }, this );

        this.ui.buttons.append( $buttons );
    },

    updateButtons: function() {
        this.renderButtons();
    },

    onCommandHandler: function( name, options ) {
        switch( name ) {
            case 'prev':
                this.model.prevPage();
                break;
            case 'next':
                this.model.nextPage();
                break;
            case 'page':
                this.model.set( 'pageNumber', options.pageNumber );
                break;
            default:
                break;
        }
    },

    _removeChildViews: function() {
        this._childViews.forEach( function( view ) {
            this.stopListening( view );
            view.remove();
        }, this );
        this._childViews.length = 0;
    },

    _appendChildView: function( view ) {
        this._childViews.push( view );
    }

} );

InfinniUI.DataNavigationView = DataNavigationView;
