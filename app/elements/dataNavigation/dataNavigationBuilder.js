function DataNavigationBuilder() {
    _.superClass( DataNavigationBuilder, this );
}

InfinniUI.DataNavigationBuilder = DataNavigationBuilder;

_.inherit( DataNavigationBuilder, ElementBuilder );

_.extend( DataNavigationBuilder.prototype, {

    createElement: function( params ) {
        return new DataNavigation( params.parent );
    },

    applyMetadata: function( params ) {
        ElementBuilder.prototype.applyMetadata.call( this, params );

        var element = params.element;
        var metadata = params.metadata;
        var pageSize;
        var that = this;

        if( Array.isArray( metadata.AvailablePageSizes ) ) {
            element.getAvailablePageSizes().reset( metadata.AvailablePageSizes );
        }

        var ds = this.findDataSource( params );
        if( ds ) {
            pageSize = ds.getProperty( '.pageSize' );

            element.setDataSource( ds );
            element.setPageSize( pageSize );

            ds.onItemsUpdated( function() {
                that.onDataUpdated( element, ds );
            } );

            if( ds.isDataReady() ) {
                this.onDataUpdated( element, ds );
            }

            element.onPageNumberChanged( function( context, message ) {
                ds.setProperty( '.pageNumber', message.value );
            } );

            element.onPageSizeChanged( function( context, message ) {
                ds.setProperty( '.pageSize', message.value );
            } );
        } else {
            console.error( 'DataSource not found' );
        }
    },

    onDataUpdated: function( element, dataSource ) {
        var dsTotalCount = dataSource.getProperty( '.totalCount' );
        var pageSize = dataSource.getProperty( '.pageSize' );
        var pageNumber = dataSource.getProperty( '.pageNumber' );
        var pageCount;

        if( typeof dsTotalCount == 'number' ) {
            pageCount = Math.ceil( dsTotalCount / pageSize );
            element.setPageCount( pageCount );
        }

        element.setPageNumber( pageNumber );
        element.setIsDataReady( true );
    },

    findDataSource: function( params ) {
        var name = params.metadata.DataSource;
        var view = params.parentView;
        var context;
        var dataSource;

        if( name && view ) {
            context = view.getContext();
            dataSource = context.dataSources[ name ];
        }

        return dataSource;
    }

} );
