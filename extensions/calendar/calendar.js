function Calendar(){

    var OperationMode = "Operations";
    var ClassicMode = "Classic";
    var QueueMode = "Queue";

    var types =  [
        {
            "Id": 1,
            "DisplayName": "К врачу"
        },
        {
            "Id": 2,
            "DisplayName": "На услугу"
        }
    ];

    var MedicalWorkerResourcesTypeId = "1";
    var ApparatusResourcesTypeId = "2";
    var CabinetResourcesTypeId = "3";

    var resourceTypes = [

        {
            "Id": "1",
            "DisplayName": "Врачи"
        },
        {
            "Id": "2",
            "DisplayName": "Аппараты"
        },
        {
            "Id": "3",
            "DisplayName": "Кабинеты"
        }
    ];

    var startDatePicker = null;
    var rootNode = $('<div class="calendar">');

    var viewContext = null;
    var lastData =[];
    var appointments = [];

    var selectedService = null;
    var selectedSchedule = null;
    var lastDate = null;
    var appointmentDocument = null;

    var mode = null;

    this.render = function(target, parameters, context){

        target.append(rootNode);

        mode = parameters['Mode'].getValue();

        viewContext = context;

        startDatePicker = context.Controls['StartDatePicker'];

        startDatePicker.onValueChanged(function(){

            fullCalendar(rootNode, lastData);
        });

        if(mode == OperationMode || mode == QueueMode)
            appointmentDocument = 'OperationAppointment';
        else if(mode == ClassicMode)
            appointmentDocument = 'Appointment';

        if(viewContext.DataSources['SelectedServiceDataSource'])
            viewContext.DataSources['SelectedServiceDataSource'].onSelectedItemChanged(function(){

                selectedService = viewContext.DataSources['SelectedServiceDataSource'].getSelectedItem();

                fullCalendar(rootNode, lastData);
            });

        if(viewContext.DataSources['PatientDataSource'])
            viewContext.DataSources['PatientDataSource'].onSelectedItemChanged(function(){

                var selectedPatient = viewContext.DataSources['PatientDataSource'].getSelectedItem();
                viewContext.Controls['PatientComboBox'].setValue(selectedPatient);
            });

        if(viewContext.Controls['ResourceTypeComboBox'])
            viewContext.Controls['ResourceTypeComboBox'].onValueChanged(function(){

                fullCalendar(rootNode, lastData);
            });

        if(mode == OperationMode){

            viewContext.Controls['ServiceComboBox'].onValueChanged(function(){

                var service = viewContext.Controls['ServiceComboBox'].getValue();
                if(!viewContext.Controls['CalendarPanel'].getVisible())
                    viewContext.Controls['CalendarPanel'].setVisible(service !== null && service !== undefined );
            });

            viewContext.Controls['DepartmentComboBox'].onValueChanged(function(){

                fullCalendar(rootNode, lastData);
            });
        }

        var i = 0;

        viewContext.DataSources['ResourceScheduleDataSource'].onItemsUpdated(function () {

            lastData = viewContext.DataSources['ResourceScheduleDataSource'].getDataItems();

            fullCalendar(rootNode, lastData);

            if( mode == OperationMode && i == 0 && context.ParentView.getParentView().getName() == "HomePage") {

                var service = viewContext.Controls['ServiceComboBox'].getValue();
                viewContext.Controls['CalendarPanel'].setVisible(service !== null && service !== undefined);
                i += 1;
            }
        });

        viewContext.DataSources['AppointmentDataSource'].onItemsUpdated(function () {

            var data = viewContext.DataSources['AppointmentDataSource'].getDataItems();
            appointments = getAppointmentsData(data);
            if(selectedSchedule)
                subCalendar(rootNode, selectedSchedule, lastDate, lastData);
            if(mode == QueueMode)
                fullCalendar(rootNode, lastData);
        });

        if(mode == QueueMode)

            viewContext.DataSources['SelectedPatientDataSource'].onSelectedItemChanged(

                function(){

                    viewContext.Controls['PatientComboBox'].setValue(
                        viewContext.DataSources['SelectedPatientDataSource'].getSelectedItem() );

                    var row = $('tr.selected', $(rootNode));

                    examination(row);
                }
            );

    }

    function fullCalendar (node, data) {

        selectedSchedule = null;

        var slots = getDaySlots(data);

        var startDate = startDatePicker.getValue();
        if(startDate)
            startDate= moment(startDate);
        else{
            startDate = moment();
            startDatePicker.setValue(startDate.toISOString());
        }

        node.html('');

        var table = $('<table class="slot-table table table-condensed" border="1" id="table1"><thead><tr><th></th></tr></thead><tbody></tbody></tbode></table>');
        var tableBody = table.find('tbody');

        node.append(table);

        if(mode == QueueMode){

            queueCalendar(startDate,node, slots,table, tableBody);
            return;
        }

        var tr = table.find('tr');
        tr.append('<th>' + startDate.format('dd DD') + '</th>');
        var clone = startDate.clone();
        for(var i = 1; i < 7; i++)
            tr.append('<th>' + clone.add('days', 1).format('dd DD') + '</th>');

        for(var d in slots){

            var r = $('<tr/>');
            tableBody.append(r);

            var link = '<a href="#" onclick="return false" class="slot-free">' + slots[d]['Data'].Resource.DisplayName +'</a>';
            r.append('<td >' + link +  '</td>');

            for(var i = 0; i < 7; i++) {
                var date = startDate.clone().add('days', i)
                var dayOfWeek = date.lang('en').format('dddd');

                if(slots[d]['Data'].EndDate && moment(slots[d]['Data'].EndDate) < date
                  || moment(slots[d]['Data'].StartDate) > date ){

                    r.append('<td/>');
                    continue;
                }

                if(slots[d]['Items'][dayOfWeek]){

                    var st = moment(slots[d]['Items'][dayOfWeek]['StartTime']).format('HH:mm');
                    var et = moment(slots[d]['Items'][dayOfWeek]['EndTime']).format('HH:mm');

                    link = '<a href="#" onclick="return false" class="slot-free">' + st + ' - ' + et + '</a>';

                    r.append('<td>' + link + '</td>');
                }
                else
                    r.append('<td/>');
            }

            r.find('a').data('rowId', d);

            r.find('a').click(function(){

                var row = $(this).data('rowId');
                var schedule = slots[row];
                subCalendar(node, schedule, startDate, data);
            });
        }
    };

    function queueCalendar(startDate, node, slots,table, tableBody){

        var tr = table.find('tr');
        tr.html('<th>Время</th><th>Опер-стол</th><th>Пациент</th>');

        var dayOfWeek = startDate.lang('en').format('dddd');
        var dateFormatted = startDate.format('YYYY-MM-DD')

        for(var d in slots){

            if(slots[d]['Data'].EndDate && moment(slots[d]['Data'].EndDate) < startDate
                || moment(slots[d]['Data'].StartDate) > startDate ){

                continue;
            }

            if(slots[d]['Items'][dayOfWeek]){

                var r = $('<tr class="apparatus header"><td/><td>'+ slots[d]['Data'].Resource.DisplayName + '</td><td/></tr>');
                tableBody.append(r);

                var cnt = slots[d]['Items'][dayOfWeek]['TimeSlots'].length;
                for(var i = 0; i < cnt; i++){

                    var timeSlot = slots[d]['Items'][dayOfWeek]['TimeSlots'][i];

                    var startTimeFormatted = timeSlot['StartTime'].format('HH:mm');
                    var endTimeFormatted = timeSlot['EndTime'].format('HH:mm');

                    var appointment = null;

                    var r = null;

                    if(appointments[slots[d]['Data'].Id] && appointments[slots[d]['Data'].Id][dateFormatted])
                    {
                        appointment = appointments[slots[d]['Data'].Id][dateFormatted].filter(function(appCand){

                            var time = moment(appCand.DateTime);

                            if(time >= moment(dateFormatted + ' ' + startTimeFormatted) && time < moment(dateFormatted + ' ' + endTimeFormatted) )
                                return true;
                            else
                                return false;
                        });
                        if(appointment.length > 0)
                            appointment = appointment[0];
                        else
                            appointment = null;
                    }

                    if(appointment)
                    {
                        var patient = getPatientString(appointment);

                        var busyClass = "apparatus busy";
                        if(!appointment.IsApproved)
                            busyClass += ' non-approved';
                        var r = $('<tr><td>' + (i + 1) + '</td><td>' + slots[d]['Data'].Resource.DisplayName + '</td><td>' + patient + '</td></tr>');
                        r.addClass(busyClass);
                        tableBody.append(r);
                    }
                    else {
                        r = $('<tr class="apparatus free"><td>' + (i + 1) + '</td><td>' + slots[d]['Data'].Resource.DisplayName + '</td><td/></tr>');

                        tableBody.append(r);
                    }

                    r.attr('data-date-time', dateFormatted + ' ' + startTimeFormatted );
                    r.attr('data-date', dateFormatted);
                    r.attr('data-startTime', timeSlot['StartTime'].format('YYYY-MM-DD HH:mm'));
                    r.attr('data-endTime', timeSlot['EndTime'].format('YYYY-MM-DD HH:mm'));
                    r.attr('data-scheduleId', slots[d]['Data'].Id);
                    r.attr('data-resourceId', slots[d]['Data'].Resource.Id);

                    var popupMenu = new DataGridPopupMenuView();
                    popupMenu.setItems(['Добавить операцию']);

                    popupMenu.on('clickItem', function (data) {

                        addOperation();
                    });

                    r.on('mousedown', function (e) {

                        $('tr.selected', tableBody).removeClass('selected');

                        $(this).addClass('selected');

                        var schedule = $(this).attr('data-scheduleId');
                        var dateTime = $(this).attr('data-date-time');

                        viewContext.DataSources['SelectedTimeDataSource'].setDataItems( [ dateTime ]  );
                        viewContext.DataSources['SelectedScheduleDataSource'].setDataItems( [ schedule ]  );

                        if (e.button == 2 &&  $(this).hasClass('free')) {
                            e.preventDefault();
                            e.stopPropagation();
                            popupMenu.show(e.pageX, e.pageY);
                        }
                    });
                }
            }
        }
    }

    function subCalendar(node, schedule, startDate, data){

        selectedSchedule = schedule;
        lastDate = startDate;

        var table = node.find('table.slot-table');
        var tableBody = table.find('tbody');
        tableBody.html('');

        var head = table.find('thead');

        var th = head.find('tr > th:first');
        th.html('');

        var l = '<a href="#" onclick="return false">Выбрать другое расписание</a>';
        th.append(schedule['Data'].Resource.DisplayName + '<br/>' + l);

        th.find('a').click(function(){
            fullCalendar(node, data);
        });

        if(schedule['Data'].IsAdditionalAllowed) {

            var r = $('<tr/>');
            tableBody.append(r);

            r.append('<td>Срочный прием</td>');

            for (var i = 0; i < 7; i++) {
                var date = startDate.clone().add('days', i)
                var dayOfWeek = date.lang('en').format('dddd');

                if(schedule['Data'].EndDate && moment(schedule['Data'].EndDate) < date
                    || moment(schedule['Data'].StartDate) > date) {
                    r.append('<td/>');
                    continue;
                }

                if (schedule['Items'][dayOfWeek]) {

                    var link = $('<a href="#" onclick="return false">Записать</a>');

                    link.attr('data-date', date.format('YYYY-MM-DD'));
                    link.attr('data-scheduleId', schedule['Data'].Id);
                    link.attr('data-resourceId', schedule['Data'].Resource.Id);
                    r.append( $('<td/>').append(link));
                }
                else
                    r.append('<td/>');
            }

            r.find('a').click(function () {
                additionalExamination($(this));
            });
        }

        var startHour = moment(schedule['Data'].IntervalSettings.map( function(i) { return i.Interval.BeginTime; }).sort()[0]).hour();
        var endHour = moment(schedule['Data'].IntervalSettings.map( function(i) { return i.Interval.EndTime; }).sort().reverse()[0]).hour();

        var maxSlotCount = 0;
        for(var day in schedule['Items']) {

            var cnt = schedule['Items'][day]['TimeSlots'].length;
            if(cnt > maxSlotCount)
                maxSlotCount = cnt;
        }

        for(var ts = 0; ts < maxSlotCount; ts++) {

            var row = $('<tr></tr>');
            row.append('<td>' + (ts + 1) + '</td>');

            for(var i = 0; i < 7; i++) {
                var date = startDate.clone().add('days', i)
                var dayOfWeek = date.lang('en').format('dddd');

                var dateFormatted = date.format('YYYY-MM-DD')

                if(schedule['Data'].EndDate && moment(schedule['Data'].EndDate) < date
                    || moment(schedule['Data'].StartDate) > date) {
                    row.append('<td/>');
                    continue;
                }

                if(schedule['Items'][dayOfWeek] && schedule['Items'][dayOfWeek]['TimeSlots'][ts]){

                    var timeSlot = schedule['Items'][dayOfWeek]['TimeSlots'][ts];

                    var startTimeFormatted = timeSlot['StartTime'].format('HH:mm');
                    var endTimeFormatted = timeSlot['EndTime'].format('HH:mm');

                    var appointment = null;

                    if(appointments[schedule['Data'].Id] && appointments[schedule['Data'].Id][dateFormatted])
                    {
                        appointment = appointments[schedule['Data'].Id][dateFormatted].filter(function(appCand){

                            var time = moment(appCand.DateTime);

                            if(time >= moment(dateFormatted + ' ' + startTimeFormatted) && time < moment(dateFormatted + ' ' + endTimeFormatted) )
                                return true;
                            else
                                return false;
                        });
                        if(appointment.length > 0)
                            appointment = appointment[0];
                        else
                            appointment = null;
                    }

                    if(appointment)
                    {
                        //var appointment = appointments[schedule['Data'].Id][dateFormatted];
                        var link = $('<a href="#" onclick="return false" class="busy">' +
                            getPatientString(appointment) + '</a>');

                        if(mode == OperationMode && !appointment.IsAppoved)
                            link.addClass('non-approved');

                        link.attr('data-appointmentId', appointment.Id);

                        row.append($('<td/>').append(link));
                    }
                    else {

                        var link = $('<a href="#" onclick="return false" class="slot-free free">' +
                        startTimeFormatted + ' - ' + timeSlot['EndTime'].format('HH:mm') + '</a>');

                        link.attr('data-date', dateFormatted);
                        link.attr('data-startTime', timeSlot['StartTime'].format('YYYY-MM-DD HH:mm'));
                        link.attr('data-endTime', timeSlot['EndTime'].format('YYYY-MM-DD HH:mm'));
                        link.attr('data-scheduleId', schedule['Data'].Id);
                        link.attr('data-resourceId', schedule['Data'].Resource.Id);

                        row.append($('<td/>').append(link));
                    }
                }
                else
                    row.append('<td/>');
            }

            row.find('a.free').click(function () {
                examination($(this));
            });

            if(mode == ClassicMode)
                row.find('a.busy').each(function(i) {

                var link = $(this);
                var popupMenu = new DataGridPopupMenuView();
                var items = ['Редактировать'];

                popupMenu.setItems(items);

                link.on('mousedown', function (e) {
                    if (e.button == 2) {
                        e.preventDefault();
                        e.stopPropagation();
                        popupMenu.show(e.pageX, e.pageY);
                    }
                });

                popupMenu.on('clickItem', function (data) {

                    editAppointment(link);
                });
            });

            tableBody.append(row);
        }
    }

    function getDaySlots(data){

        var result = [];

        for(var i in data){

            var schedule = data[i];
            var holidays = (schedule.HolidayCalendarSign ?  schedule.Schedule.Holidays : []) || [];
            var intervals = schedule.IntervalSettings;

            var isFiltered = applyFiltersToSchedule(schedule);

            if(!isFiltered)
                continue;

            var value = [];
            value['Data'] = schedule;

            var days = [];

            for(var j in intervals){

                var interval = intervals[j];

                if(!interval.Interval || !interval.Interval.RepeatDays)
                    continue;

                var startTimeString = interval.Interval.BeginTime;
                var endTimeString = interval.Interval.EndTime;

                if(startTimeString == endTimeString)
                    continue;

                var duration = (interval.Duration / interval.PatientCount) || 20;

                var totalHours = moment(endTimeString).hour() - moment(startTimeString).hour();
                var slotCount = totalHours *60 / duration;

                for(var d in interval.Interval.RepeatDays){

                    if(!interval.Interval.RepeatDays[d])
                        continue;

                    if(holidays[d])
                        continue;

                    if(!days[d]) days[d] = [];

                    if(!days[d]['StartTime'])
                        days[d]['StartTime']= startTimeString;

                    if(startTimeString < days[d]['StartTime'])
                        days[d]['StartTime'] = startTimeString;

                    if(!days[d]['EndTime'])
                        days[d]['EndTime']= endTimeString;

                    if(endTimeString > days[d]['EndTime'])
                        days[d]['EndTime'] = endTimeString;

                    if(!days[d]['TimeSlots'])
                        days[d]['TimeSlots']= [];

                    for(var ts = 0; ts < slotCount; ts++)
                        days[d]['TimeSlots'].push( {
                            'StartTime':(moment(startTimeString).add('minutes', duration*ts)),
                            'EndTime':(moment(startTimeString).add('minutes', duration*ts + duration))
                        } );

                    days[d]['TimeSlots'] = _.sortBy(days[d]['TimeSlots'], function(sl){ return sl.StartTime; });
                }
            }

            if(_.keys(days).length == 0)
                continue;

            value['Items'] = days;
            result[schedule.Id] = value;
        }

        return result;
    }

    function applyFiltersToSchedule(schedule){

        var startDate = startDatePicker.getValue();

        if(!schedule.IntervalSettings || schedule.IntervalSettings.length == 0)
            return false;

        if(startDate) {
            startDate = moment(startDate);

            if (schedule.EndDate && moment(schedule.EndDate) < startDate
                || moment(schedule.StartDate) > startDate.clone().add('days', 6)) {

                return false;
            }
        }

        if(selectedService){

            if(!schedule.MedicalWorker || !schedule.MedicalWorker.Services )
                return false;
            else{

                var f = _.find(schedule.MedicalWorker.Services, function(serv){ return serv.Id == selectedService.Id  } );
                if(!f)
                    return false;
            }
        }

        var isSurgical = isScheduleForSurgicalApparatus(schedule);

        if(isSurgical && mode == ClassicMode)
            return false;
        else if(!isSurgical && (mode == OperationMode || mode == QueueMode) )
            return false;

        if(viewContext.Controls['DepartmentComboBox']){
            if(viewContext.Controls['DepartmentComboBox'].getValue()){

                var dId = viewContext.Controls['DepartmentComboBox'].getValue().Id;
                if(!schedule.Department || schedule.Department.Id != dId)
                    return false;
            }
        }

        if(viewContext.Controls['ResourceTypeComboBox']){
            if(viewContext.Controls['ResourceTypeComboBox'].getValue()){

                if( !schedule.Resource || !schedule.Resource.Id)
                    return false;

                var ds = viewContext.DataSources['CrossDataSource'];
                var resource = _.find(ds.getDataItems(), function(item){ return item.Id == schedule.Resource.Id; } )

                if(!resource)
                    return false;

                var type = viewContext.Controls['ResourceTypeComboBox'].getValue().Id;

                switch (type){
                    case MedicalWorkerResourcesTypeId :
                        return resource.__DocumentId == "medicalworker";
                    case ApparatusResourcesTypeId:
                        return resource.__DocumentId == "apparatus";
                    case CabinetResourcesTypeId:
                        return resource.__DocumentId == "cabinet";
                }
            }
        }

        return true;
    }

    function getAppointmentsData(data){

        var res = [];
        for(var i in data){

            if(data[i].Schedule){

                var id = data[i].Schedule.Id;

                var date = moment(data[i].DateTime);

                var dateKey = date.format('YYYY-MM-DD'),
                    timeKey = date.format('HH:mm');

                if(!res[id])
                    res[id] = [];

                if(!res[id][dateKey])
                    res[id][dateKey] = [];

                res[id][dateKey].push(data[i]);
            }
        }

        return res;
    }

    function additionalExamination(link){

        alert('Срочник: ' + moment(link.attr('data-date')).format('DD-MM-YYYY') + ' ' + link.attr('data-scheduleId'));
    }

    function editAppointment(link){

        var ds = viewContext.DataSources['AppointmentDataSource'];
        var id = link.attr('data-appointmentId');

        var app = _.find(ds.getDataItems(), function(item){return item.Id == id; });
        if(app){

            ds.setSelectedItem(app);

            viewContext.Global.executeAction({

                EditAction:{
                    View: {
                        AutoView: {
                            ConfigId: 'Schedule',
                            DocumentId: appointmentDocument,
                            MetadataName: 'EditView',
                            OpenMode: 'Dialog'
                        }
                    },
                    DataSource: 'AppointmentDataSource'
                }
            });
        }

    }

    function examination(link){

        var date = moment(link.attr('data-date'));
        var time = moment(link.attr('data-startTime'));
        date.hour(time.hour());
        date.minute(time.minute());
        date.second(0);

        var scheduleId = link.attr('data-scheduleId');
        var resourceId = link.attr('data-resourceId');

        var ds = viewContext.DataSources['CrossDataSource'];
        var resource = _.find(ds.getDataItems(), function(item){ return item.Id == resourceId; } );

        var service = selectedService;

        if(mode == OperationMode) {

            var serviceComboBox = viewContext.Controls['ServiceComboBox'];
            if(serviceComboBox) {
                service = serviceComboBox.getValue();
                if (service)
                    service.Name = service.DisplayName;
            }
        }

        viewContext.Global.executeAction(
            {
                AddAction: {
                    View: {
                        AutoView: {
                            ConfigId: 'Schedule',
                            DocumentId: appointmentDocument,
                            MetadataName: 'EditView',
                            OpenMode: 'Dialog',
                            Parameters: {
                                SourceMode: mode
                            }
                        }
                    },
                    DataSource: 'AppointmentDataSource'
                }
            },
            function (view) {

                view.getContext().Controls['ScheduleComboBox'].setValue({Id:scheduleId, DisplayName:'-'});

                view.getContext().Controls['DateTimeDatePicker'].setValue(date.toISOString());

                if(resource){

                    if(resource.__DocumentId == "medicalworker"){
                        resource.DisplayName = (resource.LastName || '') + ' ' + (resource.FirstName || '') + ' ' + (resource.MiddleName || '');
                        view.getContext().Controls['MedicalWorkerComboBox'].setValue(resource);

                        if(view.getContext().Controls['AppointmentTypeComboBox'])
                            view.getContext().Controls['AppointmentTypeComboBox'].setValue(types[0]);
                    }

                    if(resource.__DocumentId == "apparatus" && (mode == OperationMode || mode == QueueMode))
                        view.getContext().Controls['ApparatusComboBox'].setValue( {Id:resourceId, DisplayName: resource.Name });
                }

                if(service){

                    view.getContext().Controls['ServiceComboBox'].setValue(
                        {Id:service.Id, DisplayName: service.Name  });

                    if(view.getContext().Controls['AppointmentTypeComboBox'])
                        view.getContext().Controls['AppointmentTypeComboBox'].setValue(types[1]);
                }

                var selectedPatient = viewContext.Controls['PatientComboBox'].getValue();
                if(selectedPatient){

                    view.getContext().Controls['PatientComboBox'].setValue(selectedPatient);
                }
            }
        );
    }

    function getPatientString(appointment){

        var patientString = '';
        var timeString = '';

        if(appointment.DateTime)
            timeString =  moment(appointment.DateTime).format('HH:mm');

        if(appointment.Patient && appointment.Patient.CommonInfo){

            var ci = appointment.Patient.CommonInfo;
            if(ci.LastName)
                patientString += ci.LastName;

            if(ci.FirstName)
                patientString += ( ci.LastName ? ' ' + ci.FirstName[0] + '.' : ci.FirstName );

            if(ci.MiddleName)
                patientString += ( ci.LastName ? ci.MiddleName[0] + '.' : ' ' + ci.MiddleName );
        }

        return patientString + '(' + timeString + ')';
    }

    function addOperation(){

        var row = $('tr.selected', $(rootNode));
        var schedule = row.attr('data-schedule-id');
        var time = row.attr('data-date-time');

        viewContext.Global.executeAction(
            {
                SelectAction: {
                    View: {
                        AutoView: {
                            ConfigId: 'Demography',
                            DocumentId: "Patient",
                            MetadataName: 'PatientsInDepartment',
                            OpenMode: 'Dialog'
                        }
                    },
                    SourceValue: {
                        PropertyBinding: {
                            DataSource: "MainDataSource",
                            Property:"$"
                        }
                    },
                    DestinationValue: {
                        PropertyBinding: {
                            DataSource: "SelectedPatientDataSource",
                            Property: "$"
                        }
                    }
                }
            });

    }

    function isScheduleForSurgicalApparatus(schedule){

        return schedule && schedule.Apparatus && schedule.Apparatus.IsSurgicalTable;
    }
}