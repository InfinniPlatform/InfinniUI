var DataNavigationPageSizes = Backbone.View.extend( {

    className: 'btn-group',

    template: InfinniUI.Template[ 'controls/dataNavigation/pageSizes/template/pageSizes.tpl.html' ],

    events: {
        'click button': 'onClickButtonHandler'
    },

    setParent: function( parent ) {
        this.model = parent.model;
        var collection = this.model.get( 'availablePageSizes' );
        collection.onChange( this.onAvailablePageSizesChanged.bind( this ) );
        this.model.on( 'change:pageSize', this.renderButtons, this );
    },

    render: function() {
        this.renderButtons();
        return this;
    },

    renderButtons: function() {
        var collection = this.model.get( 'availablePageSizes' );
        var pageSize = this.model.get( 'pageSize' );
        var html = collection.toArray().map( function( size ) {
            return this.template( { size: size, active: pageSize === size } );
        }, this );

        this.$el.html( html );
    },

    onAvailablePageSizesChanged: function() {
        this.renderButtons();
    },

    onClickButtonHandler: function( event ) {
        var $el = $( event.target );
        var pageSize = parseInt( $el.attr( 'data-size' ), 10 );

        this.model.set( 'pageSize', pageSize );
    }

} );

InfinniUI.DataNavigationPageSizes = DataNavigationPageSizes;
