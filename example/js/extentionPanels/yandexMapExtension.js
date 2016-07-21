function YaMapExtension(context, args) {
    this.context = context;

    this.$el = args.$el;
    this.parameters = args.parameters;
    this.itemTemplate = args.itemTemplate;

    this.coordinate = args.parameters.coordinate.getValue();
    this.points = args.parameters.points.getValue();

}


_.extend( YaMapExtension.prototype, {

    render: function(){

        this.$el.height(300);
        var el = this.$el.get(0);
        var that=this;
        var $div = $('<div id="map" style="width: 600px; height: 400px"></div>');

        this.$el.append($div);
        var ctx = $div.get(0);
        var myMap;

        ymaps.ready(function ()
        {
            if(that.coordinate.address.length !==0){
            ymaps.geocode(that.coordinate.address, {
                results: 1
            }).then(function (res) {
                var firstGeoObject = res.geoObjects.get(0);

                myMap = new ymaps.Map(ctx, {center:firstGeoObject.geometry.getCoordinates(),zoom:that.coordinate.zoom});
                myMap.geoObjects.add(firstGeoObject);
                that.setMarkers(myMap);

            });
            }else{
                myMap = new ymaps.Map(ctx, {center:that.coordinate.center,zoom:that.coordinate.zoom});
            }

        });
    },
    setMarkers:function (myMap) {
        var that = this;
        var i = 0;


        while(i < that.points.length) {
        var adr = that.points[i].address;
        console.log(adr);

            ymaps.geocode(adr, {
                results: 1
            }).then(function (res) {
                var myyGeoObject = res.geoObjects.get(0);
                var myGeoObject = new ymaps.GeoObject({
                    // Описание геометрии.
                    geometry: {
                        type: "Point",
                        coordinates: myyGeoObject.geometry.getCoordinates()
                    },
                    // Свойства.
                    properties: {
                        // Контент метки.
                        iconContent: 'Я тащусь',
                        hintContent: 'Ну давай уже тащи'
                    }
                }, {
                    // Опции.
                    // Иконка метки будет растягиваться под размер ее содержимого.
                    preset: 'islands#blackStretchyIcon',
                    // Метку можно перемещать.
                    draggable: true
                });
                myMap.geoObjects.add(myGeoObject);

            });


        i++;


    }
        }

});


