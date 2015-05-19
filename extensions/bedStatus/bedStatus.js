function BedStatus() {
    var signalR = $.hubConnection('http://IC:9900'),
        hub = signalR.createHubProxy('WebClientNotificationHub');

    var self = this,
        $tar = null;

    hub.on('BedStatus', function (a) {
        self.render($tar);
    });

    signalR.start().done(function () {
        console.log('Now connected, connection ID=' + signalR.id);
    });

    this.render = function (target) {
        if ($tar == null) {
            $tar = target;
        }

        target.empty();

        var data = {
            id: null,
            changesObject: {
                Configuration: 'EmergencyRoom',
                Register: 'BedStatusIncremental',
                FromDate: moment('2014-10-01'),
                ToDate: moment('2014-10-30'),
                Interval: 'day',
                Dimensions: ['Bed']
            },
            replace: false
        };

        $.ajax({
            type: 'post',
            url: 'http://IC:9900/SystemConfig/StandardApi/metadata/GetRegisterValuesByPeriods',
            data: JSON.stringify(data)
        }).then(function (records) {
            var added = [];

            for (var r in records) {
                var rec = records[r],
                    bedNumber = rec.Bed;

                if (added.indexOf(bedNumber) == -1) {
                    added.push(bedNumber);
                    var $row = $('<tr>').appendTo($table);
                    $row.append($('<td>').html('Койка № ' + rec.Bed));

                    for (var i = 1; i <= 30; i++) {
                        var find = function (re) {
                            return re.Bed == bedNumber && moment(re.DocumentDate).format('D') == i;
                        };

                        var $td = $('<td>').appendTo($row);
                        var entry = _.find(records, find);

                        if (entry) {
                            if (entry.Availability == 1) {
                                $td.addClass('bg-blue-madison');
                            } else if (entry.Availability > 1) {
                                $td.addClass('bg-red-pink');
                            }
                        }
                    }
                }
            }
        });

        var $table = $('<table>').addClass('table table-bordered'),
            $tr = $('<tr>').appendTo($table);

        $tr.append($('<th>'));

        for (var i = 1; i <= 30; i++) {
            $tr.append($('<th>').html(i));
        }

        target.html($table);
    }
}