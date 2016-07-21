function MapExtension(context, args) {
    this.context = context;

    this.$el = args.$el;
    this.parameters = args.parameters;
    this.itemTemplate = args.itemTemplate;

    this.coordinate = args.parameters.coordinate.getValue();
    this.points = args.parameters.points.getValue();

}

MapExtension.isGoogleMapsReady = false;

MapExtension.googleReady = function(){
    MapExtension.isGoogleMapsReady = true;

    if(typeof MapExtension.onGoogleReadyHandler == 'function'){
        MapExtension.onGoogleReadyHandler();
    }
};

MapExtension.onGoogleReady = function(handler){
    MapExtension.onGoogleReadyHandler = handler;
};

_.extend( MapExtension.prototype, {

    render: function(){

        var that = this;

        that.$el.height(300);

        if(MapExtension.isGoogleMapsReady){
            that.renderMaps();
        }else{
            MapExtension.onGoogleReady(function(){
                that.renderMaps();
            });
        }

    },

    renderMaps: function () {
        var el = this.$el.get(0);
        var map;
        var that = this;
        var geocoder = new google.maps.Geocoder();

        var address = this.coordinate.address;

        geocoder.geocode({'address':address},function (results) {
            if(address.length!==0){
                var latitude = results[0].geometry.location.lat();
                var longitude = results[0].geometry.location.lng();
                that.coordinate.center.lat = latitude;
                that.coordinate.center.lng = longitude;
                map = new google.maps.Map(el, that.coordinate);
                that.setMarkers(map,that.points,geocoder);
            }
            else {
                map = new ymaps.Map(el, that.coordinate);
                that.setMarkers(map,that.points,geocoder);
            }

        });
    },

    setMarkers: function(map,points,geocoder){
        for(var i = 0;i < points.length;  i++) {
            var that = this;
            geocoder.geocode({'address':points[i].address}, (function(index){
                return function (results) {
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();

                    var myCenter ={"lat": latitude, "lng": longitude};

                    var marker = new google.maps.Marker({
                        map: map,
                        position: myCenter,
                        title:points[index].address
                    });
                    if('onChoose' in points[index]){
                        marker.addListener('click', function() {
                            new ScriptExecutor(that.context.view).executeScript(points[index].onChoose, {});
                        });
                    }

                }

            })(i));
        }
    }
});

function initMap(){
    MapExtension.googleReady();
}