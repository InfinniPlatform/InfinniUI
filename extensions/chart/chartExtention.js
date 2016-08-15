function ChartExtension(context, args) {
	this.context = context;

	this.$el = args.$el;
	this.parameters = args.parameters;
	this.itemTemplate = args.itemTemplate;

	this.chartParams = args.parameters.chartParams.getValue();
}

_.extend( ChartExtension.prototype, {

	render:function () {
		this.renderChart();
	},

	renderChart: function() {
		var dimentions = this.chartParams.dimentions || {},
				$canvas = $('<canvas></canvas>'),
				chartParams = this.chartParams;

		this.$el.width(dimentions.width || "100%");
		this.$el.height(dimentions.height || "100%");
		this.$el.append($canvas);

		setTimeout(function() {
			var myChart = new Chart($canvas, {
				type: chartParams.type,
				data: chartParams.data,
				options: chartParams.options
			});
		}, 0);
	}
});
