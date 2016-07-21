function ChartExtension(context, args) {
    this.context = args.context;

    this.$el = args.$el;
    this.parameters = args.parameters;
    this.itemTemplate = args.itemTemplate;

    this.chartParams = args.parameters.chartParams.getValue();

    this.defaultColors = [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)"
    ];

}


_.extend( ChartExtension.prototype, {
    render:function () {
        this.renderChart();
    },
    renderChart: function(){
        var that = this;


        var $canvas = $('<canvas width="400" height="400"></canvas>');

        this.$el.append($canvas);
        var ctx = $canvas.get(0).getContext("2d");
        var data = that.chartParams.data;

        setTimeout(function(){

            if(data.datasets[0].backgroundColor == undefined ){
                data.datasets[0].backgroundColor = that.defaultColors;
                data.datasets[0].borderColor = that.defaultColors;
            }
            
            var myChart = new Chart(ctx, {
                type: that.chartParams.type,
                data: that.chartParams.data,
                options: that.chartParams.options
            });
        },1000);



    }
});