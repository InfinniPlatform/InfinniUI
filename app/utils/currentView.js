var OpenedViewCollection = function() {
    var list = [];

    this.appendView = function( metadata, viewMetadata, view ) {
        list.push( {
            metadata: metadata,
            viewMetadata: viewMetadata,
            view: view
        } );
    };

    this.removeView = function( view ) {
        for( var i = 0, ln = list.length; i < ln; i = i + 1 ) {
            if( view === list[ i ].view ) {
                list.splice( i, 1 );
                break;
            }
        }
    };

    this.getLastView = function() {
        if( list.length === 0 ) {
            return;
        }

        return list[ list.length - 1 ];
    };

    this.getList = function() {
        return list;
    };

};

InfinniUI.views = new OpenedViewCollection();

