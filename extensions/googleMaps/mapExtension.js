// Для корректной работы данного расширения, необходимо включить в index.html строку:
// <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC09SyyqSdo9TflFMZAuDUN7pse3h28Tk4&callback=initMap" async defer></script>

function MapExtension( context, args ) {
    this.context = context;
    this.$el = args.$el;
    this.parameters = args.parameters;
    this.itemTemplate = args.itemTemplate;
    this.coordinate = args.parameters.coordinate.getValue();
    this.points = args.parameters.points.getValue();

}

MapExtension.isGoogleMapsReady = false;

MapExtension.googleReady = function() {
    MapExtension.isGoogleMapsReady = true;

    if( typeof MapExtension.onGoogleReadyHandler == 'function' ) {
        MapExtension.onGoogleReadyHandler();
    }
};

MapExtension.onGoogleReady = function( handler ) {
    MapExtension.onGoogleReadyHandler = handler;
};

_.extend( MapExtension.prototype, {

    render: function() {
        var that = this;

        if( MapExtension.isGoogleMapsReady ) {
            this.renderMaps();
        } else {
            MapExtension.onGoogleReady( function() {
                that.renderMaps();
            } );
        }
    },

    renderMaps: function() {
        var ctx = this.$el.get( 0 );
        var dimentions = this.coordinate.Dimentions || {};
        var that = this;
        var geocoder = new google.maps.Geocoder();
        var address = this.coordinate.address;
        var myMap;

        this.$el.height( dimentions.Height || '100%' );
        this.$el.width( dimentions.Width || '100%' );

        geocoder.geocode( { 'address': address }, function( res ) {
            if( address.length !== 0 ) {
                var latitude = res[ 0 ].geometry.location.lat();
                var longitude = res[ 0 ].geometry.location.lng();
                that.coordinate.center.lat = latitude;
                that.coordinate.center.lng = longitude;
            }
            myMap = new google.maps.Map( ctx, that.coordinate );
            that.setMarkers( myMap, geocoder );
        } );
    },

    setMarkers: function( myMap, geocoder ) {
        var that = this;
        var callback = function( item, i, arr ) {
            geocoder.geocode( { 'address': item.address }, function( res ) {
                var latitude = res[ 0 ].geometry.location.lat();
                var longitude = res[ 0 ].geometry.location.lng();
                var myCenter = { 'lat': latitude, 'lng': longitude };
                var marker = new google.maps.Marker( {
                    map: myMap,
                    position: myCenter,
                    title: item.address
                } );

                if( item.infoWindow ) {
                    var infoWindow = new google.maps.InfoWindow( {
                        content: item.infoWindow.content
                    } );
                    marker.addListener( item.infoWindow.event, function() {
                        infoWindow.open( myMap, marker );
                    } );
                }

                if( item.Events ) {
                    for( var key in item.Events ) {
                        ( function() {
                            var script = item.Events[ key ];
                            marker.addListener( key, function() {
                                new ScriptExecutor( that.context.view ).executeScript( script, { source: that } );
                            } );
                        } )();
                    }
                }
            } );
        };
        this.points.forEach( callback );
    }

} );

function initMap() {
    MapExtension.googleReady();
}
