var metadata;

var suite = new Benchmark.Suite({
    onStart: function () {
        metadata = generateTextBoxes();
    }
});

suite
    .add('Classic generator', function () {
        var $view = $('<div>').empty(),
            $panel = $('<div>').empty();

        for (var p in metadata.LayoutPanel.StackPanel.Items) {
            $panel.append($('<input>').attr('type', 'text'));
        }

        $view.append($panel);
    })
    .add('Platform generator', function () {
        var linkView = new LinkView($('<div>'), null, function () {
            var builder = new ApplicationBuilder();
            return builder.buildType(fakeView(), 'View', metadata);
        });

        linkView.createView(function(view){
            view.open();
        })
    })
    .on('complete', function () {
        var classic = this[0],
            platform = this[1];
        $('#out')
            .append($('<h1>').html('TextBox generation test'))
            .append($('<h2>').html(classic.name))
            .append($('<p>').html(classic.count))
            .append($('<h2>').html(platform.name))
            .append($('<p>').html(platform.count))
            .append($('<h2>').html('Result'))
            .append($('<p>').html(classic.count / platform.count));
    })
    .run();