// Для корректной работы данного расширения, необходимо включить в index.html строку:
// <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"></script>

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
		var that = this,
				dimentions = this.coordinate.Dimentions || {},
				ctx = this.$el.get(0),
				myMap;

		this.$el.height(dimentions.Height || '100%');
		this.$el.width(dimentions.Width || '100%');

		ymaps.ready(function () {

			if( that.coordinate.address.length !==0 ) {
				that.yaMapsGeocode(that.coordinate.address, function(res) {
					var firstGeoObject = res.geoObjects.get(0);
					myMap = new ymaps.Map(ctx, {center: firstGeoObject.geometry.getCoordinates(), zoom: that.coordinate.zoom});
					myMap.geoObjects.add(firstGeoObject);
					that.setMarkers(myMap);
				});
			} else {
				myMap = new ymaps.Map(ctx, {center: that.coordinate.center, zoom: that.coordinate.zoom});
			}

		});
	},
	
	setMarkers:function (myMap) {
		var that = this;

		var callback = function(item, i, arr) {
			that.yaMapsGeocode(item.address, function(res) {
				var myyGeoObject = res.geoObjects.get(0);
				item.GeoObjGeometry.geometry.coordinates = item.GeoObjGeometry.geometry.coordinates || myyGeoObject.geometry.getCoordinates();
				var myGeoObject = new ymaps.GeoObject(item.GeoObjGeometry, item.GeoObjOptions);
				myMap.geoObjects.add(myGeoObject);
			});
		};

		this.points.forEach(callback);
	},

	yaMapsGeocode: function(address, callback) {
		ymaps.geocode(address, {
			results: 1
		}).then(function (res) {
			callback(res);
		});
	}

});


