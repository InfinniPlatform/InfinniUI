function oldCalendar() {
    var $calendar;
    var globalContext;

    var signalR = $.hubConnection('http://IC:9900'),
        hub = signalR.createHubProxy('WebClientNotificationHub');

    hub.on('ReservationCreated', function (a) {
        var reservation = JSON.parse(a);

        toastr.info(
            'Длительность: ' + reservation.Duration + 'мин.',
            'Выдан талон на ресурс "' + reservation.Resource.DisplayName + '"');

        $calendar.fullCalendar('renderEvent', {
            id: guid(),
            title: reservation.Comment,
            start: reservation.StartTime,
            end: moment(reservation.StartTime).add(parseInt(reservation.Duration), 'minutes').toISOString(),
            allDay: false,
            backgroundColor: Metronic.getBrandColor('blue')
        }, true);
    });

    signalR.start().done(function () {
        console.log('Now connected, connection ID=' + signalR.id);
    });

    var fullCalendar = function (node, events) {
        $calendar = $(node).fullCalendar({
            header: false,
            defaultView: 'agendaWeek',
            defaultDate: '2014-09-12',
            selectable: true,
            selectHelper: true,
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
                'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл',
                'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
            dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            buttonText: {
                today: 'сегодня',
                month: 'месяц',
                week: 'неделя',
                day: 'день'
            },
            allDayDefault: false,

            allDayText: 'Все дни',
            allDaySlot: false,
            slotMinutes: 15,
            defaultEventMinutes: 120,
            height: 825,

            axisFormat: 'HH:mm',
            timeFormat: {
                agenda: 'HH:mm{ - HH:mm}'
            },
            dragOpacity: {
                agenda: .5
            },
            minTime: 8,
            maxTime: 21,

            fixedWeekCount: false,
            firstDay: 1,

            editable: true,

            select: function (start, end) {
                globalContext.executeAction({
                    AddAction: {
                        View: {
                            AutoView: {
                                ConfigId: 'Registry',
                                DocumentId: 'ResourceReservationForm',
                                ViewType: 'EditView',
                                OpenMode: 'Dialog'
                            }
                        },
                        DataSource: 'ReservationsDataSource'
                    }
                }, function (view) {
                    var diff = new Date(moment(end).diff(moment(start)));

                    view.getContext().Controls['StartTimeEditor'].setValue(moment(start).add(6, 'hours').toISOString());
                    view.getContext().Controls['DurationEditor'].setValue((diff.getHours() - 6) * 60 + diff.getMinutes());
                });
            },

            eventLimit: true, // allow "more" link when too many events
            events: events,

            eventClick: function (calEvent, jsEvent, view) {
                var r = confirm("Delete " + calEvent.title);
                if (r === true) {
                    $(node).fullCalendar('removeEvents', calEvent._id);
                }
            }
        });
    };

    this.render = function (target, parameters, context) {
        var $node = target.append('<div>');

        window.setTimeout(function () {
            fullCalendar($node, []);
        }, 0);

        var curr = new Date();
        var firstDay = moment(new Date(curr.setDate(curr.getDate() - curr.getDay())));

        var days = [
            firstDay.add(1, 'days').format('YYYY-MM-DD'),
            firstDay.add(1, 'days').format('YYYY-MM-DD'),
            firstDay.add(1, 'days').format('YYYY-MM-DD'),
            firstDay.add(1, 'days').format('YYYY-MM-DD'),
            firstDay.add(1, 'days').format('YYYY-MM-DD'),
            firstDay.add(1, 'days').format('YYYY-MM-DD'),
            firstDay.add(1, 'days').format('YYYY-MM-DD')
        ];

        globalContext = context.Global;

        var slots,
            reservations;

        function rerender() {
            //Добавляем слоты
            function resourceId(r) {
                return r.Resource.Id;
            }

            function addEvent(day, item) {
                _.each(item.Week.Time, function (time) {
                    if (time.PeriodParity.DisplayName == 'Четные дни' && day.slice(-1) % 2 != 0) return true;
                    if (time.PeriodParity.DisplayName == 'Нечетные дни' && day.slice(-1) % 2 == 0) return true;

                    $calendar.fullCalendar('renderEvent', {
                        id: guid(),
                        title: item.Resource.DisplayName,
                        start: day + 'T' + moment(time.From).format('HH:mm:ss'),
                        end: day + 'T' + moment(time.To).format('HH:mm:ss'),
                        allDay: false,
                        backgroundColor: Metronic.getBrandColor('green')
                    }, true);
                });
            }

            $calendar.fullCalendar('removeEvents');

            if (_.uniq(slots, resourceId).length != 1) {
                return;
            }

            _.each(slots, function (schedule) {
                if (schedule.Week.Monday) addEvent(days[0], schedule);
                if (schedule.Week.Tuesday) addEvent(days[1], schedule);
                if (schedule.Week.Wednesday) addEvent(days[2], schedule);
                if (schedule.Week.Thursday) addEvent(days[3], schedule);
                if (schedule.Week.Friday) addEvent(days[4], schedule);
                if (schedule.Week.Saturday) addEvent(days[5], schedule);
                if (schedule.Week.Sunday) addEvent(days[6], schedule);
            });

            // Добавляем талончики
            _.each(reservations, function (reservation) {
                if (!reservation.Resource || reservation.Resource.Id != slots[0].Resource.Id)
                    return true;

                $calendar.fullCalendar('renderEvent', {
                    id: guid(),
                    title: reservation.Comment,
                    start: reservation.StartTime,
                    end: moment(reservation.StartTime).add(parseInt(reservation.Duration), 'minutes').toISOString(),
                    allDay: false,
                    backgroundColor: Metronic.getBrandColor('blue')
                }, true);
            });
        }

        parameters['BaseScheduleDataSource'].onValueChanged(function (data) {
            slots = data;
            rerender();
        });

        parameters['ReservationsDataSource'].onValueChanged(function (data) {
            reservations = data;
            rerender();
        });
    }
}